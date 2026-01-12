import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Orders from "./orders";
import PlaceOrder from "./PlaceOrder";
import Portfolio from "./Portfolio";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔑 Sync state with localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLogin);
  }, []);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />
        }
      />

      <Route
        path="/signup"
        element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <Signup />
        }
      />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
      />
      <Route
        path="/orders"
        element={isLoggedIn ? <Orders /> : <Navigate to="/" replace />}
      />
      <Route
        path="/place-order"
        element={isLoggedIn ? <PlaceOrder /> : <Navigate to="/" replace />}
      />
      <Route
        path="/portfolio"
        element={isLoggedIn ? <Portfolio /> : <Navigate to="/" replace />}
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
