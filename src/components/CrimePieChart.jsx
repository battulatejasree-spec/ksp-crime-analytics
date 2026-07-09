import { districtCrimeData } from "../data/crimeData";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA66CC",
];

function CrimePieChart() {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={districtCrimeData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="crimes"
        nameKey="district"
        label
      >
        {districtCrimeData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export default CrimePieChart;