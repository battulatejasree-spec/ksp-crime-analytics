import { Brain, Sparkles, AlertTriangle, TrendingUp, ShieldAlert, Zap } from "lucide-react";

const aiInsights = [
  {
    id: "insight-1",
    title: "Rising Cyber Crime in Bengaluru Urban",
    desc: "AI patterns show an elevated concentration of online financial fraud attempts targeting senior demographics in Bangalore East and North sectors during early morning hours.",
    type: "warning",
    time: "Updated 10m ago"
  },
  {
    id: "insight-2",
    title: "Fraud Escalation in Urban Districts",
    desc: "A cluster of identity forgery cases has emerged across Mysore Central and Hubli metro regions. Correlative modeling suggests unified syndicate operations.",
    type: "info",
    time: "Updated 2h ago"
  },
  {
    id: "insight-3",
    title: "Emerging Cyber Hotspot Detected",
    desc: "An unexpected spike in cyber fraud cases (UPI phishing) has raised the local risk score in Bangalore South from Moderate to High.",
    type: "danger",
    time: "Updated 4h ago"
  },
  {
    id: "insight-4",
    title: "Predicted High-Risk Regions",
    desc: "Based on cyclical patterns, Bangalore East and Mysore Sector 4 are projected to experience elevated commercial burglary risks over the upcoming holiday weekend.",
    type: "danger",
    time: "Updated 6h ago"
  }
];

const trendAlerts = [
  {
    id: "alert-1",
    title: "Crime Spike Alert: Cyber Crimes",
    message: "A +35% increase in phishing reports in Bangalore East has triggered an automatic system warning flag.",
    level: "Critical",
    color: "danger"
  },
  {
    id: "alert-2",
    title: "High Risk Alert: Property Robbery",
    message: "Historical weekend metrics show high property robbery vulnerability in Mysore Palace perimeter sectors.",
    level: "Elevated",
    color: "warning"
  },
  {
    id: "alert-3",
    title: "Investigation Delay Warning",
    message: "Average case clearance rate in Hubli Division has extended beyond standard threshold (72 hours max target).",
    level: "Attention",
    color: "info"
  }
];

function AIInsightsPanel() {
  const getCardIcon = (type) => {
    switch (type) {
      case "danger":
        return <AlertTriangle size={18} className="text-danger" />;
      case "warning":
        return <ShieldAlert size={18} className="text-warning" />;
      case "info":
        return <Sparkles size={18} className="text-info" />;
      default:
        return <Brain size={18} className="text-secondary" />;
    }
  };

  const getAlertLevelStyle = (level) => {
    switch (level) {
      case "Critical":
        return { backgroundColor: "var(--danger-bg)", color: "var(--danger)", border: "1px solid #fca5a5" };
      case "Elevated":
        return { backgroundColor: "var(--warning-bg)", color: "var(--warning)", border: "1px solid #fcd34d" };
      default:
        return { backgroundColor: "var(--info-bg)", color: "var(--info)", border: "1px solid #a5f3fc" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* AI Insights Section */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3 className="dashboard-card-title">
            <Brain size={20} className="text-secondary" />
            AI Crime Intelligence Briefing
          </h3>
          <span className="badge info" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Zap size={12} style={{ fill: "currentColor" }} /> Predictive Models Active
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "15px" }}>
          {aiInsights.map((insight) => (
            <div 
              key={insight.id} 
              className="dashboard-card" 
              style={{ 
                padding: "16px", 
                borderLeft: `4px solid var(--${insight.type === "danger" ? "danger" : insight.type === "warning" ? "warning" : "info"})`,
                backgroundColor: "#f8fafc"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                {getCardIcon(insight.type)}
                <h4 style={{ fontSize: "0.95rem", color: "var(--color-primary)", fontWeight: "700" }}>{insight.title}</h4>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                {insight.desc}
              </p>
              <div style={{ marginTop: "12px", fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "right" }}>
                {insight.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Alerts Section */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3 className="dashboard-card-title">
            <ShieldAlert size={20} className="text-secondary" />
            Active Security Trend Alerts
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
          {trendAlerts.map((alert) => (
            <div 
              key={alert.id}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                padding: "16px",
                borderRadius: "var(--radius-md)",
                ...getAlertLevelStyle(alert.level)
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <TrendingUp size={20} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: "700", margin: "0" }}>{alert.title}</h4>
                  <p style={{ fontSize: "0.8rem", margin: "4px 0 0 0", opacity: 0.9 }}>{alert.message}</p>
                </div>
              </div>
              <span className={`badge ${alert.color}`} style={{ flexShrink: 0 }}>
                {alert.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AIInsightsPanel;
