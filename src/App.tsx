import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AdminPage } from "./admin.page";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ServicePointPage } from "./service-point.page";
import { ServicePage } from "./service.page";
import { ServicesPage } from "./Services.page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/servicePoints/" element={<ServicePointPage />} />
      <Route
        path="/servicePoints/:servicePointId"
        element={<ServicePointPage />}
      />
      <Route path="/services/" element={<ServicesPage />} />
      <Route path="/services/:serviceId" element={<ServicePage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
