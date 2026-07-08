import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { district: "Bangalore", crimes: 120 },
  { district: "Mysore", crimes: 80 },
  { district: "Hubli", crimes: 65 },
  { district: "Belgaum", crimes: 50 },
  { district: "Mangalore", crimes: 40 },
];

function DistrictCrimeChart() {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="district" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="crimes" />
    </BarChart>
  );
}

export default DistrictCrimeChart;