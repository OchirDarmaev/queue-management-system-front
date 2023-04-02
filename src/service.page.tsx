import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function ServicePage() {
  const { servicePointId: serviceId } = useParams();
  const [service, setService] = useState([]);
  // const [newServicePointName, setNewServicePointName] = useState("");
  //

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/services/" + serviceId
      );
      setService(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div>
      <h1>{service.name}</h1>
      <h1>{service.description}</h1>
    </div>

    
  );
}
