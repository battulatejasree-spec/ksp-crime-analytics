import { ShieldCheck, Cpu, Zap, Compass, AlertCircle, ArrowUpRight, BarChart3 } from "lucide-react";

const predictions = [
  {
    id: "pred-1",
    district: "Bangalore East Sector",
    riskScore: 92,
    forecast: "+15% Cyber Crime uptick predicted",
    hotspots: "Outer Ring Rd, Whitefield Hub",
    priority: "Critical",
    color: "danger"
  },
  {
    id: "pred-2",
    district: "Mysore Palace Perimeter",
    riskScore: 74,
    forecast: "Likely Robbery clustering (80% confidence)",
    hotspots: "Main Gate, Commercial Boulevard",
    priority: "High",
    color: "danger"
  },
  {
    id: "pred-3",
    district: "Bangalore South Sector",
    riskScore: 65,
    forecast: "Emerging commercial burglaries cluster",
    hotspots: "Jayanagar 4th Block, Koramangala",
    priority: "Medium",
    color: "warning"
  },
  {
    id: "pred-4",
    district: "Hubli West Division",
    riskScore: 22,
    forecast: "-8% decrease in burglary projected",
    hotspots: "None projected",
    priority: "Low",
    color: "success"
  }
];

function PredictiveAnalytics() {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Critical":
        return "badge danger";
      case "High":
        return "badge danger";
      case "Medium":
        return "badge warning";
      default:
        return "badge success";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Overview Card */}
      <div className="dashboard-card" style={{ background: "linear-gradient(135deg, #0b132b 0%, #1e3a8a 100%)", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
          <div style={{ padding: "8px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px", color: "#60a5fa" }}>
            <Cpu size={24} style={{ animation: "pulse 2s infinite" }} />
          </div>
          <div>
            <h3 style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: "700" }}>AI Forecasting & Proactive Patrol Dispatch</h3>
            <p style={{ color: "#93c5fd", fontSize: "0.8rem", margin: "4px 0 0 0" }}>
              Machine learning models matching criminal trends, seasonal indicators, and sector coverage to forecast squad dispatch needs.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Predictions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {predictions.map((pred) => (
          <div key={pred.id} className="dashboard-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontWeight: "700", color: "var(--color-primary)", fontSize: "0.95rem" }}>{pred.district}</span>
                <span className={getPriorityStyle(pred.priority)} style={{ fontSize: "0.65rem" }}>{pred.priority} Queue</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Crime Forecast:</span>
                  <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>{pred.forecast}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Predicted Hotspots:</span>
                  <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>{pred.hotspots}</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "14px", marginTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <BarChart3 size={14} className="text-secondary" />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Predictive Risk Index</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                <span style={{ fontSize: "1.3rem", fontWeight: "800", color: pred.riskScore >= 70 ? "var(--danger)" : pred.riskScore >= 50 ? "var(--warning)" : "var(--success)" }}>
                  {pred.riskScore}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PredictiveAnalytics;
