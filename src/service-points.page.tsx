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

export function ServicePointsPage() {
  const [servicePoints, setServicePoints] = useState([]);
  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const addServicePoint = async () => {
    if (values.name === "") {
      return;
    }

    try {
      await axios.post("http://localhost:3000/servicePoints", {
        name: values.name,
        description: values.description,
      });
      setValues({ name: "", description: "" });
      await fetchServicePoints();
    } catch (error) {
      console.error("Error adding service point:", error);
    }
  };

  const deleteServicePoint = async (servicePointId) => {
    try {
      await axios.delete(
        `http://localhost:3000/servicePoints/${servicePointId}`
      );
      await fetchServicePoints();
    } catch (error) {
      console.error("Error deleting service point:", error);
    }
  };
  const fetchServicePoints = async () => {
    try {
      const response = await axios.get("http://localhost:3000/servicePoints");
      setServicePoints(response.data);
    } catch (error) {
      console.error("Error fetching service points:", error);
    }
  };

  useEffect(() => {
    fetchServicePoints();
  }, []);

  return (
    <>
      <CssBaseline />
      <Typography variant="h1">Service Points</Typography>
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
            addServicePoint();
          }}
        >
          Add
        </Button>
      </Stack>
      <List>
        {servicePoints.map((servicePoint) => (
          <ListItem
            key={servicePoint.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon
                  onClick={() => deleteServicePoint(servicePoint.id)}
                />
              </IconButton>
            }
          >
            <ListItemButton href={"/servicePoints/" + servicePoint.id}>
              <ListItemText
                primary={servicePoint.name}
                secondary={servicePoint.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
