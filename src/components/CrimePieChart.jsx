import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Murder", value: 15 },
  { name: "Robbery", value: 25 },
  { name: "Cyber Crime", value: 30 },
  { name: "Fraud", value: 20 },
  { name: "Kidnapping", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

function CrimePieChart() {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
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