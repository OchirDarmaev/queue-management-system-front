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
import { API_HOST } from "./config";

export function CounterPage() {
  const { servicePointId } = useParams();
  const [servicePoint, setServicePoint] = useState({
    name: "",
    description: "",
    servicePointNumber: "",
    serviceIds: [],
    servicePointStatus: "",
  });
  const [services, setServices] = useState([]);

  const [queue, setQueue] = useState(undefined);

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

      if (response.data.currentQueueItem) {
        const queueResponse = await axios.get(
          API_HOST + "/queue/" + response.data.currentQueueItem
        );
        setQueue(queueResponse.data);
      } else {
        setQueue(undefined);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const updateServicePointStatus = async (
    status: "waiting" | "in-service" | "closed"
  ) => {
    try {
      await axios.put(
        API_HOST + "/servicePoints/" + servicePointId + "/status/" + status
      );
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Typography variant="h4">Service point</Typography>
      <Stack direction="column" spacing={1}>
        <Typography variant="h4">{servicePoint.name}</Typography>
        <Typography variant="h4">{servicePoint.description}</Typography>
        <Typography variant="h4">{servicePoint.servicePointNumber}</Typography>
      </Stack>

      <Typography variant="h4">{servicePoint.servicePointStatus}</Typography>
      {queue && <Typography variant="h4">{queue.item.memorableId} </Typography>}
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={() => updateServicePointStatus("waiting")}
        >
          Wait for it
        </Button>
        <Button
          variant="contained"
          onClick={() => updateServicePointStatus("in-service")}
        >
          In-service
        </Button>
        <Button
          variant="contained"
          onClick={() => updateServicePointStatus("closed")}
        >
          Close service point
        </Button>
      </Stack>

      <List>
        {res.servicePointServices.map((service) => (
          <ListItem key={service.id}>
            <ListItemText
              primary={service.name}
              secondary={service.description}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
