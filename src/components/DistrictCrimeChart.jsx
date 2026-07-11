import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { BarChart3 } from "lucide-react";

const data = [
  { district: "Bangalore", crimes: 120 },
  { district: "Mysore", crimes: 80 },
  { district: "Hubli", crimes: 65 },
  { district: "Belgaum", crimes: 50 },
  { district: "Mangalore", crimes: 40 },
];

const COLORS = ["#1e3a8a", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

const CustomTooltip = ({ active, payload, label }) => {
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
        <p style={{ fontWeight: "600", margin: "0", color: "#1e293b" }}>{label}</p>
        <p style={{ margin: "4px 0 0 0", color: "#1e3a8a", fontWeight: "700" }}>
          {payload[0].value} Reported Crimes
        </p>
      </div>
    );
  }
  return null;
};

function DistrictCrimeChart() {
  return (
    <div className="dashboard-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">
          <BarChart3 size={18} className="text-secondary" />
          District-wise Crime Analysis
        </h3>
      </div>
      <div className="chart-container-wrapper" style={{ flexGrow: 1, minHeight: "260px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="district" 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="crimes" radius={[4, 4, 0, 0]} maxBarSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DistrictCrimeChart;