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
import { ServicePointsPage } from "./service-points.page";
import { RegistrationTerminalPage } from "./registrationTerminal.page";
import { ServicesPage } from "./services.page";
import { Board } from "./Board";
import { CounterPage } from "./counter.page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/board" element={<Board />} />
      <Route path="/servicePoints/" element={<ServicePointsPage />} />
      <Route
        path="/servicePoints/:servicePointId"
        element={<ServicePointPage />}
      />
      <Route
        path="/servicePoints/:servicePointId/counter"
        element={<CounterPage />}
      />
      <Route path="/services/" element={<ServicesPage />} />
      <Route path="/services/:serviceId" element={<ServicePage />} />
      <Route
        path="/registrationTerminal/"
        element={<RegistrationTerminalPage />}
      />
      <Route path="/board" element={<Board />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
