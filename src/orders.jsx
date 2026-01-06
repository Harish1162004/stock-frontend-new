import React from "react";
import Sidebar from "./Sidebar";
import { useTrading } from "./context/TradingContext";
import "./orders.css";

function Orders() {
  const { orders } = useTrading();

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <h1>📘 Order Book</h1>
        <p className="subtitle">All your placed orders appear here</p>

        {orders.length === 0 ? (
          <div className="empty-state">
            <h3>No orders yet</h3>
            <p>Place a Buy or Sell order to see it here.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Side</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i}>
                    <td>{o.symbol}</td>
                    <td className={o.side === "BUY" ? "buy" : "sell"}>
                      {o.side}
                    </td>
                    <td>{o.qty}</td>
                    <td>₹{o.price}</td>
                    <td className={`status ${o.status.toLowerCase()}`}>
                      {o.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
