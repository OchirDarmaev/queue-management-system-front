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
import AlertDialogSlide from "./dialog.component";
import { API_HOST } from "./config";
import { Auth } from "aws-amplify";

// show popup with client info
export function RegistrationTerminalPage() {
  const [services, setServices] = useState<
    {
      id: string;
      name: string;
      description: string;
    }[]
  >([]);
  const [clientInfo, setClientInfo] = useState(null);
  const [selectedService, setSelectedService] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);

  const fetchServices = async () => {
    try {
      const user = await Auth.currentSession();
      const token = user.getIdToken().getJwtToken();
      const response = await axios.get(API_HOST + "/services", {
        headers: {
          Authorization:
            // todo
            "Bearer " + token,
        },
      });
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const putClientInQueue = async (serviceId: string) => {
    try {
      const user = await Auth.currentSession();
      const token = user.getIdToken().getJwtToken();
      const response = await axios.post(
        API_HOST + "/services/" + serviceId + "/queue",
        undefined,
        {
          headers: {
            Authorization:
              // todo
              "Bearer " + token,
          },
        }
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
          <ListItemButton
            key={service.id}
            onClick={() => setSelectedService(service)}
          >
            <ListItemText
              primary={service.name}
              secondary={service.description}
            />
          </ListItemButton>
        ))}
      </List>
      {selectedService && (
        <AlertDialogSlide
          title="Dialog"
          text={"Please confirm" + selectedService.name}
          open={Boolean(selectedService)}
          handleClose={() => setSelectedService(null)}
          dialogActions={[
            {
              text: "Cancel",
              type: "secondary",
              onClick: () => setSelectedService(null),
            },
            {
              text: "Ok",
              type: "primary",
              onClick: async () => {
                await putClientInQueue(selectedService.id);
                setSelectedService(null);
              },
            },
          ]}
        />
      )}
    </>
  );
}
