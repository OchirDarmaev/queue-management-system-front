import React, { useState, useEffect } from "react";
import axios from "axios";

const MonitorPage = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await axios.get("/queue/status");
      setQueue(response.data);
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  return (
    <div>
      <h1>Monitor</h1>
      <table>
        <thead>
          <tr>
            <th>Client Number</th>
            <th>Service Name</th>
            <th>Service Point</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((item) => (
            <tr key={item.clientNumber}>
              <td>{item.clientNumber}</td>
              <td>{item.serviceName}</td>
              <td>{item.servicePointName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonitorPage;
