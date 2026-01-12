import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TradingProvider } from "./context/TradingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TradingProvider>
        <App />
      </TradingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
