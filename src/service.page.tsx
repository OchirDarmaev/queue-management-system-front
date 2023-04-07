import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  CssBaseline,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export function ServicePage() {
  const { serviceId } = useParams();
  const [service, setService] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/services/" + serviceId
      );
      setService(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const save = async () => {
    try {
      await axios.put("http://localhost:3000/services/" + serviceId, {
        name: service.name,
        description: service.description,
      });
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleChange = (prop) => (event) => {
    setService({ ...service, [prop]: event.target.value });
  };

  return (
    <>
      <CssBaseline />
      <Typography variant="h4">Service</Typography>
      <Stack direction="column" spacing={1}>
        <TextField
          label="Name"
          variant="outlined"
          value={service.name}
          onChange={handleChange("name")}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={service.description}
          onChange={handleChange("description")}
        />
        <Button variant="contained" onClick={() => save()}>
          Save
        </Button>
      </Stack>
    </>
  );
}
