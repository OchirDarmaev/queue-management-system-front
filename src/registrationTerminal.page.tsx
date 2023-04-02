import {
  Button,
  CssBaseline,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

// show popup with client info
export function RegistrationTerminalPage() {
  const [services, setServices] = useState([]);
  const [clientInfo, setClientInfo] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:3000/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const putClientInQueue = async (serviceId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/services/" + serviceId + "/queue"
      );
      setClientInfo(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (clientInfo) {
    return (
      <>
        <CssBaseline />
        <Typography variant="h1">Registration Terminal</Typography>
        <Typography variant="h2">Your info</Typography>
        <Typography variant="h3">{JSON.stringify(clientInfo)}</Typography>
        <Button onClick={() => setClientInfo(null)}>Back</Button>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Typography variant="h1">Registration Terminal</Typography>
      <Typography variant="h2">Select service you need</Typography>
      <List>
        {services.map((service) => (
          <ListItemButton onClick={() => putClientInQueue(service.id)}>
            <ListItemText
              primary={service.name}
              secondary={service.description}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
