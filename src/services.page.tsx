import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_HOST } from "./config";
export function ServicesPage() {
  const [services, setServices] = useState([]);
  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const addService = async () => {
    if (values.name === "") {
      return;
    }

    try {
      await axios.post(API_HOST + "/services", {
        name: values.name,
        description: values.description,
      });
      setValues({ name: "", description: "" });
      await fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const deleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3000/services/${serviceId}`);
      await fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  const fetchServices = async () => {
    try {
      const response = await axios.get(API_HOST + "/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <CssBaseline />
      <Typography variant="h1">Services</Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Name"
          variant="outlined"
          onChange={handleChange("name")}
        />
        <TextField
          label="Description"
          variant="outlined"
          onChange={handleChange("description")}
        />

        <Button
          variant="contained"
          onClick={() => {
            addService();
          }}
        >
          Add
        </Button>
      </Stack>
      <List>
        {services.map((service) => (
          <ListItem
            key={service.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={() => deleteService(service.id)} />
              </IconButton>
            }
          >
            <ListItemButton href={"/services/" + service.id}>
              <ListItemText
                primary={service.name}
                secondary={service.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
