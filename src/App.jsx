

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Orders from "./orders";
import PlaceOrder from "./PlaceOrder";
import Portfolio from "./Portfolio";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      {/* PUBLIC */}

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/orders"
        element={isLoggedIn ? <Orders /> : <Navigate to="/" />}
      />
      <Route
        path="/place-order"
        element={isLoggedIn ? <PlaceOrder /> : <Navigate to="/" />}
      />
      <Route
        path="/portfolio"
        element={isLoggedIn ? <Portfolio /> : <Navigate to="/" />}
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
