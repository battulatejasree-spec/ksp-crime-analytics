import { useState, useEffect } from "react";
import { Landmark, AlertTriangle, ShieldAlert, Award, FileText, Search } from "lucide-react";

const districtSummary = [
  { name: "Bengaluru Urban", totalCases: 120, majorCrime: "Cyber Crime", riskScore: 88, status: "Critical" },
  { name: "Mysore District", totalCases: 80, majorCrime: "Robbery", riskScore: 68, status: "High" },
  { name: "Hubli-Dharwad Metro", totalCases: 65, majorCrime: "Fraud", riskScore: 55, status: "Moderate" },
  { name: "Belgaum Rural", totalCases: 50, majorCrime: "Kidnapping", riskScore: 45, status: "Moderate" },
  { name: "Mangalore Coastal Sector", totalCases: 40, majorCrime: "Cyber Crime", riskScore: 35, status: "Low" }
];

function DistrictDrilldown({ searchQuery = "" }) {
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    if (searchQuery) {
      setFilterSearch(searchQuery);
    }
  }, [searchQuery]);

  const filteredDistricts = districtSummary.filter((d) => 
    d.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
    d.majorCrime.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const getRiskScoreColor = (score) => {
    if (score >= 80) return "var(--danger)";
    if (score >= 50) return "var(--warning)";
    return "var(--success)";
  };

  const getStatusBadge = (status) => {
    if (status === "Critical" || status === "High") return <span className="badge danger">{status}</span>;
    if (status === "Moderate") return <span className="badge warning">{status}</span>;
    return <span className="badge success">{status}</span>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Controls */}
      <div className="table-controls" style={{ marginBottom: "10px" }}>
        <div className="table-search-input" style={{ width: "300px" }}>
          <Search size={14} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search districts or offenses..." 
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
        </div>
        <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Showing {filteredDistricts.length} active policing sectors
        </span>
      </div>

      {/* Grid of District Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
        {filteredDistricts.length > 0 ? (
          filteredDistricts.map((district) => (
            <div key={district.name} className="dashboard-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "180px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ padding: "6px", backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)", borderRadius: "6px" }}>
                      <Landmark size={16} />
                    </div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--color-primary)" }}>{district.name}</h3>
                  </div>
                  {getStatusBadge(district.status)}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Total Reported Cases:</span>
                    <span style={{ fontWeight: "700", color: "var(--text-primary)" }}>{district.totalCases}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Primary Crime:</span>
                    <span style={{ fontWeight: "700", color: "var(--text-primary)" }}>{district.majorCrime}</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Patrol Risk Assessment</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: "800", color: getRiskScoreColor(district.riskScore) }}>{district.riskScore}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>/100</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="dashboard-card" style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            No police districts found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default DistrictDrilldown;
