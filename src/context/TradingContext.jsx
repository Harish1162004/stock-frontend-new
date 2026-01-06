import { createContext, useContext, useState } from "react";

const TradingContext = createContext();

export function TradingProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [prices, setPrices] = useState({});

  const updatePrice = (symbol, price) => {
    setPrices(prev => ({ ...prev, [symbol]: price }));
  };

  const placeOrder = ({ symbol, side, price, qty }) => {
    const order = {
      id: Date.now(),
      symbol,
      side,
      price,
      qty,
      time: Math.floor(Date.now() / 1000), // ✅ UNIX SECONDS
      status: "EXECUTED",
    };

    setOrders(prev => [order, ...prev]);
  };

  return (
    <TradingContext.Provider
      value={{
        prices,
        orders,
        placeOrder,
        updatePrice,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
}

export const useTrading = () => useContext(TradingContext);
