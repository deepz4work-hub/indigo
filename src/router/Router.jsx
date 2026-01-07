// router/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import FlightBooking from "../components/FlightBooking";
import FlightResults from "../components/FlightResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App has <Outlet />
    children: [
      { path: "/", element: <FlightBooking /> },   // Booking form
      { path: "results", element: <FlightResults /> }, // Results page
    ],
  },
]);

export default router;
