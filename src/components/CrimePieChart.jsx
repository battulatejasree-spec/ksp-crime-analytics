import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";

const data = [
  { name: "Murder", value: 15 },
  { name: "Robbery", value: 25 },
  { name: "Cyber Crime", value: 30 },
  { name: "Fraud", value: 20 },
  { name: "Kidnapping", value: 10 },
];

// Curated Police Command Center color palette
const COLORS = [
  "#ef4444", // Murder - Red
  "#f59e0b", // Robbery - Amber
  "#06b6d4", // Cyber Crime - Cyan
  "#2563eb", // Fraud - Accent Blue
  "#8b5cf6", // Kidnapping - Purple
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        style={{ 
          backgroundColor: "#ffffff", 
          padding: "10px 14px", 
          border: "1px solid #e2e8f0", 
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          fontSize: "0.85rem"
        }}
      >
        <p style={{ fontWeight: "600", margin: "0", color: "#1e293b" }}>{payload[0].name}</p>
        <p style={{ margin: "4px 0 0 0", color: "#2563eb", fontWeight: "700" }}>
          {payload[0].value} Cases ({((payload[0].value / 100) * 100).toFixed(0)}%)
        </p>
      </div>
    );
  }
  return null;
};

function CrimePieChart() {
  return (
    <div className="dashboard-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">
          <PieIcon size={18} className="text-secondary" />
          Crime Distribution
        </h3>
      </div>
      <div className="chart-container-wrapper" style={{ flexGrow: 1, minHeight: "260px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{ outline: "none" }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: "0.8rem", fontFamily: "inherit" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CrimePieChart;