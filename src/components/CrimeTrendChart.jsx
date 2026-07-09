import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"; "recharts";

import { crimeTrendData } from "../data/trendData";

function CrimeTrendChart() {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Crime Trends Over Time</h2>
<ResponsiveContainer width="100%" height={400}>
  <LineChart data={crimeTrendData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="crimes"
    />
  </LineChart>
</ResponsiveContainer>
    </div>
  );
}

export default CrimeTrendChart;
