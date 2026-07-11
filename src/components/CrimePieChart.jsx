import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { districtCrimeData } from "../data/crimeData";

// Curated Police Command Center color palette
const COLORS = [
  "#ef4444", // Red
  "#f59e0b", // Amber
  "#06b6d4", // Cyan
  "#2563eb", // Accent Blue
  "#8b5cf6", // Purple
  "#10b981", // Emerald
  "#ec4899", // Pink
  "#6366f1"  // Indigo
];

const totalCrimesVal = districtCrimeData.reduce((acc, curr) => acc + curr.crimes, 0);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const name = payload[0].name;
    const percentage = totalCrimesVal > 0 ? ((value / totalCrimesVal) * 100).toFixed(0) : 0;
    
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
        <p style={{ fontWeight: "600", margin: "0", color: "#1e293b" }}>{name}</p>
        <p style={{ margin: "4px 0 0 0", color: "#2563eb", fontWeight: "700" }}>
          {value} Cases ({percentage}%)
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
              data={districtCrimeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="crimes"
              nameKey="district"
            >
              {districtCrimeData.map((entry, index) => (
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