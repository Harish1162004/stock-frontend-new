import React, { useMemo } from "react";
import Sidebar from "./sidebar";
import { useTrading } from "./context/TradingContext";
import { calculatePosition } from "./utils/positions";
import "./Portfolio.css";

function Portfolio() {
  // ✅ SAFE DEFAULTS
  const trading = useTrading() || {};
  const orders = trading.orders || [];
  const prices = trading.prices || {};

  const symbols = ["TCS", "INFY", "RELIANCE"];

  const positions = useMemo(() => {
    return symbols
      .map((symbol) => {
        const symbolOrders = orders.filter((o) => o.symbol === symbol);
        const ltp = prices[symbol] ?? 0;

        return {
          symbol,
          ...calculatePosition(symbolOrders, ltp),
        };
      })
      .filter((p) => p.netQty !== 0);
  }, [orders, prices]);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <h1>📊 Portfolio</h1>

        {positions.length === 0 ? (
          <p className="no-position">No open positions</p>
        ) : (
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>LTP</th>
                <th>P&amp;L</th>
                <th>P&amp;L %</th>
              </tr>
            </thead>

            <tbody>
              {positions.map((p) => (
                <tr key={p.symbol}>
                  <td>{p.symbol}</td>
                  <td>{p.netQty}</td>
                  <td>₹{p.avgPrice.toFixed(2)}</td>
                  <td>₹{(prices[p.symbol] ?? 0).toFixed(2)}</td>
                  <td className={p.pnl >= 0 ? "profit" : "loss"}>
                    ₹{p.pnl.toFixed(2)}
                  </td>
                  <td className={p.pnl >= 0 ? "profit" : "loss"}>
                    {p.pnlPercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
