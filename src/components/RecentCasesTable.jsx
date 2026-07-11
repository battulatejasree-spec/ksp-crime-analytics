import { Clock, Radio, ShieldAlert } from "lucide-react";

const recentCases = [
  { id: "RC-1049", title: "Phishing network alert", time: "12m ago", district: "Bangalore", status: "Active", type: "Cyber" },
  { id: "RC-1048", title: "Assault reported", time: "45m ago", district: "Mysore", status: "Dispatched", type: "Assault" },
  { id: "RC-1047", title: "Commercial break-in", time: "2h ago", district: "Bangalore", status: "Patrolling", type: "Theft" },
  { id: "RC-1046", title: "Vehicle theft reported", time: "4h ago", district: "Hubli", status: "Investigation", type: "Theft" },
  { id: "RC-1045", title: "High-risk missing person", time: "6h ago", district: "Belgaum", status: "Active", type: "Abduction" }
];

function RecentCasesTable() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <span className="badge danger">Active</span>;
      case "Dispatched":
        return <span className="badge warning" style={{ backgroundColor: "#ffedd5", color: "#c2410c" }}>Dispatched</span>;
      case "Patrolling":
        return <span className="badge info">Patrol</span>;
      case "Investigation":
        return <span className="badge success" style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>Investigating</span>;
      default:
        return <span className="badge info">{status}</span>;
    }
  };

  return (
    <div className="dashboard-card" style={{ height: "100%" }}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">
          <Radio size={18} className="text-secondary" style={{ animation: "pulse 2s infinite" }} />
          Live Dispatch Feed
        </h3>
      </div>
      <div className="table-responsive">
        <table className="custom-table" style={{ fontSize: "0.85rem" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Incident</th>
              <th>District</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentCases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td style={{ fontWeight: "600", color: "#1e3a8a" }}>{caseItem.id}</td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "500", color: "#0f172a" }}>{caseItem.title}</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{caseItem.type} Alert</span>
                  </div>
                </td>
                <td>{caseItem.district}</td>
                <td style={{ display: "flex", alignItems: "center", gap: "4px", color: "#64748b", borderBottom: "none", padding: "14px 0" }}>
                  <Clock size={12} />
                  <span>{caseItem.time}</span>
                </td>
                <td>{getStatusBadge(caseItem.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentCasesTable;
