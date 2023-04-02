import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function ServicePointPage() {
  const { servicePointId } = useParams();
  const [services, setServices] = useState([]);
  const [servicePoint, setServicePoint] = useState([]);
  const [newServicePointName, setNewServicePointName] = useState("");

  const servicePointsById = Object.fromEntries(
    servicePoint.map((servicePoint) => [servicePoint.id, servicePoint])
  );
  const serviceById = Object.fromEntries(
    services.map((service) => [service.id, service])
  );
  useEffect(() => {
    fetchServices();
    fetchServicePoint();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:3000/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchServicePoint = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/servicePoint/" + servicePointId
      );
      setServicePoint(response.data);
    } catch (error) {
      console.error("Error fetching service points:", error);
    }
  };

  // const deleteServicePoint = async (servicePointId) => {
  //   try {
  //     await axios.delete(`/servicePoints/${servicePointId}`);
  //     setServicePoints(
  //       servicePoints.filter(
  //         (servicePoint) => servicePoint.id !== servicePointId
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error deleting service point:", error);
  //   }
  // };

  async function addServiceToServicePoint(
    serviceId: string,
    servicePointId: string
  ): Promise<void> {
    try {
      await axios.put("http://localhost:3000/servicePoints/" + servicePointId, {
        serviceIds: [
          ...servicePointsById[servicePointId].serviceIds,
          serviceId,
        ],
      });
    } catch (error) {
      console.error("Error adding service:", error);
    }
  }

  async function removeServiceFromServicePoint(
    serviceId: string,
    servicePointId: string
  ): Promise<void> {
    try {
      await axios.put("http://localhost:3000/servicePoints/" + servicePointId, {
        serviceIds: servicePointsById[servicePointId].serviceIds.filter(
          (id) => id !== serviceId
        ),
      });
    } catch (error) {
      console.error("Error removing service:", error);
    }
  }

  return (
    <div>
      <h1>Service point</h1>
      <p>{servicePoint.name}</p>
      <p>{servicePoint.description}</p>
      <ul>
        {servicePoint.serviceIds.map((serviceId) => (
          <li key={serviceId}>
            <p>{serviceById[serviceId].name}</p>
            <p>{serviceById[serviceId].description}</p>
            <button
              onClick={async () => {
                await removeServiceFromServicePoint(serviceId, servicePoint.id);
                await fetchServicePoints();
              }}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
      Services
      <ul>
        {services
          .filter(
            (x) =>
              !servicePoint.serviceIds.some((serviceId) => serviceId === x.id)
          )
          .map((service) => (
            <li key={service.id}>
              <p>{service.name}</p>
              <p>{service.description}</p>
              <button
                onClick={async () => {
                  await addServiceToServicePoint(service.id, servicePoint.id);
                  await fetchServicePoint();
                }}
              >
                Add
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
