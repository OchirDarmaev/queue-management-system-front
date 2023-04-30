import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { API_HOST } from "./config";

export function ServicePointPage() {
  const { servicePointId } = useParams();
  const [servicePoint, setServicePoint] = useState({
    name: "",
    description: "",
    servicePointNumber: "",
    serviceIds: [],
  });
  const [services, setServices] = useState([]);
  const serviceById = Object.fromEntries(
    services.map((service) => [service.id, service])
  );

  useEffect(() => {
    fetchServices();
    fetchServicePoint();
  }, []);

  const res = services.reduce(
    (acc, curr) => {
      if (servicePoint.serviceIds.includes(curr.id)) {
        acc.servicePointServices.push(curr);
      } else {
        acc.listAvailableServices.push(curr);
      }
      return acc;
    },
    {
      servicePointServices: [],
      listAvailableServices: [],
    }
  );

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_HOST + "/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  const fetchServicePoint = async () => {
    try {
      const response = await axios.get(
        API_HOST + "/servicePoints/" + servicePointId
      );
      setServicePoint(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const save = async () => {
    try {
      await axios.put(API_HOST + "/servicePoints/" + servicePointId, {
        name: servicePoint.name,
        description: servicePoint.description,
        servicePointNumber: servicePoint.servicePointNumber,
      });
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleChange =
    (prop: "name" | "description" | "servicePointNumber") =>
    (event: { target: { value: any } }) => {
      setServicePoint({ ...servicePoint, [prop]: event.target.value });
    };

  async function removeService(serviceId: string) {
    try {
      await axios.put(API_HOST + "/servicePoints/" + servicePointId, {
        serviceIds: servicePoint.serviceIds.filter((id) => id !== serviceId),
      });
      await fetchServicePoint();
    } catch (error) {
      console.error("Error removing service:", error);
    }
  }

  async function addService(serviceId: string): Promise<void> {
    try {
      await axios.put(API_HOST + "/servicePoints/" + servicePointId, {
        serviceIds: [...servicePoint.serviceIds, serviceId],
      });
      await fetchServicePoint();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  }

  return (
    <>
      <CssBaseline />
      <Typography variant="h4">Service point</Typography>
      <Stack direction="column" spacing={1}>
        <TextField
          label="Name"
          variant="outlined"
          value={servicePoint.name}
          onChange={handleChange("name")}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={servicePoint.description}
          onChange={handleChange("description")}
        />
        <TextField
          label="Service point number"
          variant="outlined"
          value={servicePoint.servicePointNumber}
          onChange={handleChange("servicePointNumber")}
        />
        <Button variant="contained" onClick={() => save()}>
          Save
        </Button>
      </Stack>
      {res && (
        <>
          <Typography variant="h4">Services</Typography>
          <List>
            {res.servicePointServices.map((service) => (
              <ListItem
                key={service.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeService(service.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={service.name} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h4">Available Services</Typography>
          <List>
            {res.listAvailableServices.map((service) => (
              <ListItem
                key={service.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="add"
                    onClick={() => addService(service.id)}
                  >
                    <AddIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={service.name} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
}
