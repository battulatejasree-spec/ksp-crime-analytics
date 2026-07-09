import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { districtCrimeData } from "../data/crimeData";

function CrimeBarChart() {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>District-wise Crime Analysis</h2>

      <ResponsiveContainer width="100%" height={400}>
  <BarChart data={districtCrimeData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="district" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="crimes" />
  </BarChart>
</ResponsiveContainer>
    </div>
  );
}

export default CrimeBarChart;