

import React, { useEffect, useState, useMemo } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import Sidebar from "./sidebar";
import CandleChart from "./components/CandleChart";
import VolumeChart from "./components/VolumeChart";
import OrderPanel from "./components/OrderPanel";
import PositionCard from "./components/PositionCard";
import OrderHistory from "./components/OrderHistory";
import { calculatePosition } from "./utils/positions";
import { useTrading } from "./context/TradingContext";
import "./Dashboard.css";

function Dashboard() {
  // ✅ GET LOGGED-IN USERNAME
  const username = localStorage.getItem("username");

  const [active, setActive] = useState("TCS");

  const [tcs, setTcs] = useState([]);
  const [infy, setInfy] = useState([]);
  const [rel, setRel] = useState([]);

  const { prices, updatePrice, orders } = useTrading();

  // ================= WEBSOCKET =================
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe("/topic/candles", (msg) => {
          const data = JSON.parse(msg.body);

          if (data?.TCS) {
            setTcs((p) => [...p.slice(-50), data.TCS]);
            updatePrice("TCS", data.TCS.close);
          }

          if (data?.INFY) {
            setInfy((p) => [...p.slice(-50), data.INFY]);
            updatePrice("INFY", data.INFY.close);
          }

          if (data?.RELIANCE) {
            setRel((p) => [...p.slice(-50), data.RELIANCE]);
            updatePrice("RELIANCE", data.RELIANCE.close);
          }
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, [updatePrice]);

  // ================= ACTIVE DATA =================
  const chartData = useMemo(() => {
    if (active === "INFY") return infy;
    if (active === "RELIANCE") return rel;
    return tcs;
  }, [active, tcs, infy, rel]);

  const ltp = prices[active];

  const activeOrders = orders.filter((o) => o.symbol === active);
  const position = calculatePosition(activeOrders, ltp);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        {/* HEADER */}
        <h1>Welcome back, {username} 👋</h1>
        <p className="subtitle">
          Live market updates powered by WebSocket ⚡
        </p>

        {/* STOCK TABS */}
        <div className="tabs">
          {["TCS", "INFY", "RELIANCE"].map((s) => (
            <button
              key={s}
              className={active === s ? "active-tab" : ""}
              onClick={() => setActive(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ===== CHART PANEL ===== */}
        <div className="chart-panel">
          <h3>{active} Live Chart</h3>

          <div className="chart-stack">
            <div className="price-chart">
              <CandleChart
                candles={chartData}
                orders={activeOrders}
                ltp={ltp}
              />
            </div>

            <div className="volume-chart">
              <VolumeChart candles={chartData} />
            </div>

            {/* ORDER PANEL */}
            <OrderPanel symbol={active} candles={chartData} />
          </div>
        </div>

        {/* ===== MARKET SNAPSHOT ===== */}
        <div className="market-snapshot">
          <div className="snapshot-card">
            <span>LTP</span>
            <h3>{ltp ? `₹${ltp.toFixed(2)}` : "--"}</h3>
          </div>

          <div className="snapshot-card">
            <span>Day High</span>
            <h3 className="profit">
              {ltp ? `₹${(ltp + 12).toFixed(2)}` : "--"}
            </h3>
          </div>

          <div className="snapshot-card">
            <span>Day Low</span>
            <h3 className="loss">
              {ltp ? `₹${(ltp - 15).toFixed(2)}` : "--"}
            </h3>
          </div>

          <div className="snapshot-card trend">
            <span>Trend</span>
            <h3>📈 Bullish</h3>
          </div>
        </div>

        {/* ===== POSITION ===== */}
        <div className="positions-section">
          <h3>Position</h3>

          {position.netQty > 0 ? (
            <PositionCard
              symbol={active}
              position={position}
              ltp={ltp}
            />
          ) : (
            <p className="no-position">No open position</p>
          )}
        </div>

        {/* ===== ORDER HISTORY ===== */}
        <OrderHistory orders={activeOrders} />

        {/* ===== MARKET INSIGHT ===== */}
        <div className="insight-box">
          <h4>📌 Market Insight</h4>
          <p>
            {active} is showing steady momentum with higher lows.
            Traders may look for breakout above resistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
   