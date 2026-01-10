
import { createChart } from "lightweight-charts";
import { useEffect, useRef, useMemo } from "react";
import { calculatePnL } from "../utils/pnl";
import "./CandleChart.css";

function CandleChart({ candles = [], orders = [], ltp }) {
  const chartRef = useRef();
  const seriesRef = useRef();

  // 📈 LIVE P&L
  const pnl = useMemo(() => calculatePnL(orders, ltp), [orders, ltp]);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      height: 420,
      layout: {
        background: { color: "#020617" },
        textColor: "#cbd5f5",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    seriesRef.current = series;
    chart.timeScale().fitContent();

    return () => chart.remove();
  }, []);

  useEffect(() => {
    if (seriesRef.current && candles.length) {
      seriesRef.current.setData(candles);
    }
  }, [candles]);

  return (
    <div className="chart-container">
      {/* 🔥 FLOATING P&L BADGE */}
      {orders.length > 0 && (
        <div className={`pnl-badge ${pnl >= 0 ? "profit" : "loss"}`}>
          {pnl >= 0 ? "+" : "-"}₹{Math.abs(pnl).toFixed(2)}
        </div>
      )}

      <div ref={chartRef} />
    </div>
  );
}

export default CandleChart;
