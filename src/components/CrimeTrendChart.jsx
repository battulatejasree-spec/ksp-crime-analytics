import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from "recharts";
import { TrendingUp } from "lucide-react";
import { crimeTrendData } from "../data/trendData";

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
        <p style={{ fontWeight: "600", margin: "0", color: "#64748b" }}>{label}</p>
        <p style={{ margin: "4px 0 0 0", color: "#2563eb", fontWeight: "700" }}>
          {payload[0].value} Cases
        </p>
      </div>
    );
  }
  return null;
};

function CrimeTrendChart() {
  return (
    <div className="dashboard-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">
          <TrendingUp size={18} className="text-secondary" />
          Crime Trend Analysis
        </h3>
      </div>
      <div className="chart-container-wrapper" style={{ flexGrow: 1, minHeight: "260px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={crimeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="month" 
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
            <Line 
              type="monotone" 
              dataKey="crimes" 
              stroke="#2563eb" 
              strokeWidth={3} 
              activeDot={{ r: 6, strokeWidth: 0 }}
              dot={{ r: 4, strokeWidth: 2, fill: "#ffffff", stroke: "#2563eb" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CrimeTrendChart;
