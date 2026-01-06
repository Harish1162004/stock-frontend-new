import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function LiveStockChart({ price }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!price) return;

    setData((prev) => {
      const updated = [
        ...prev,
        { value: Number(price.toFixed(2)) },
      ];
      return updated.slice(-25);
    });
  }, [price]);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <YAxis
          domain={["dataMin - 50", "dataMax + 50"]}
          hide
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#00ffb3"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LiveStockChart;
