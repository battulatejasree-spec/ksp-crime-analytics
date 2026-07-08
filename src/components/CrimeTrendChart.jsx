import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { month: "Jan", crimes: 20 },
  { month: "Feb", crimes: 35 },
  { month: "Mar", crimes: 28 },
  { month: "Apr", crimes: 45 },
  { month: "May", crimes: 38 },
  { month: "Jun", crimes: 50 },
];

function CrimeTrendChart() {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="crimes" />
    </LineChart>
  );
}

export default CrimeTrendChart;