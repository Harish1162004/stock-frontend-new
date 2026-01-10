
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function VolumeChart({ candles }) {
  if (!candles || candles.length === 0) return null;

  const data = candles.map((c, i) => ({
    time: i,
    volume: c.volume || Math.random() * 1000, // fallback safety
    fill: c.close >= c.open ? "#22c55e" : "#ef4444",
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="time" hide />
        <YAxis hide />
        <Bar dataKey="volume">
          {data.map((entry, index) => (
            <cell key={index} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default VolumeChart;
