

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import { useEffect, useState } from "react";
import useWebSocketPrice from "./hooks/useWebSocketPrice";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

function LiveChart({ stock = "TCS" }) {
  const prices = useWebSocketPrice(); // 🔥 LIVE prices
  const [history, setHistory] = useState([]);

  // ⏱ Add new price every update
  useEffect(() => {
    if (prices[stock]) {
      setHistory((prev) => [...prev.slice(-20), prices[stock]]);
    }
  }, [prices, stock]);

  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: `${stock} Price`,
        data: history,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { display: false },
      y: {
        ticks: { color: "#94a3b8" },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3 style={{ color: "white", marginBottom: "10px" }}>
        📉 {stock} Live Chart
      </h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default LiveChart;
