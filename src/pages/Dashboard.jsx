import { useState } from "react";
import CrimeHotspots from "../components/CrimeHotspots";
import RecentCases from "../components/RecentCases";
import CrimeTable from "../components/CrimeTable";
import DistrictCrimeChart from "../components/DistrictCrimeChart";
import CrimeTrendChart from "../components/CrimeTrendChart";
import CrimePieChart from "../components/CrimePieChart";
import StatsCard from "../components/StatsCard";
import CrimeRecordsTable from "../components/CrimeRecordsTable";
import RecentCasesTable from "../components/RecentCasesTable";
import AIInsightsPanel from "../components/AIInsightsPanel";
import DistrictDrilldown from "../components/DistrictDrilldown";
import PredictiveAnalytics from "../components/PredictiveAnalytics";
import Settings from "../components/Settings";
import CrimeBarChart from "../components/CrimeBarChart";
import { 
  Database, 
  Eye, 
  Shield, 
  Brain, 
  Landmark, 
  Clock, 
  Settings as SettingsIcon, 
  Sparkles, 
  ShieldAlert, 
  Map, 
  Search, 
  Cpu, 
  AlertTriangle,
  X
} from "lucide-react";

function Dashboard({ activeTab = "overview", setActiveTab, searchQuery = "" }) {
  const [selectedCaseDetail, setSelectedCaseDetail] = useState(null);

  // Sample case details database for details modal popup
  const caseBriefs = {
    "KSP-2026-049": { title: "UPI Gateway Phishing Cluster", officer: "Sub-Inspector Rajesh", station: "Indiranagar PS", description: "Multi-layered UPI phishing ring targetting Indiranagar residents. Recovered 4 cloned SIM cards and 2 laptops. Traced transactions back to secondary bank endpoints.", notes: "Coordinating with Bangalore Cyber Cell." },
    "KSP-2026-048": { title: "Sector 4 Homicide Investigation", officer: "Inspector Tejasree", station: "Mysore Town PS", description: "Homicide case reported in Sector 4 residential sector. Forensics team dispatched. Suspect identified through surveillance camera timestamps.", notes: "Autopsy report awaited." },
    "KSP-2026-047": { title: "Gold Store Heist", officer: "IGP Alok Kumar", station: "Hubli Division PS", description: "Commercial burglary case solved. Stolen ornaments valued at ₹14 Lakhs recovered from local pawn interface. Two gang leaders arrested.", notes: "Closed." },
    "KSP-2026-046": { title: "Payroll Fraud Cluster", officer: "Sub-Inspector Rajesh", station: "Halasuru PS", description: "Phake corporate payroll transaction system diverted ₹24 Lakhs of state treasury funding. Recovered 80% funds by freezing server vaults.", notes: "Audit log attached." },
    "KSP-2026-045": { title: "Kidnapping Case - Sector B", officer: "Inspector Tejasree", station: "Belgaum Central PS", description: "Ransom call traced to border lines. Police teams conducted raid, safely rescued victim within 18 hours. Hostage taker in custody.", notes: "Under trial." }
  };

  const handleOpenCaseDetail = (id) => {
    const detail = caseBriefs[id] || { 
      title: "Active Incident Report", 
      officer: "Duty Officer Assigned", 
      station: "District Headquarters", 
      description: "Standard law enforcement record briefing. Case documentation catalogued inside main police records vault.", 
      notes: "Routine case update." 
    };
    setSelectedCaseDetail({ id, ...detail });
  };

  // Render sub-views based on active sidebar tab selection
  const renderTabContent = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div className="dashboard-header">
              <div className="dashboard-title-area">
                <h2>Statistical Crime Analytics</h2>
                <span className="dashboard-subtitle">Historical case records, district crime tallies, and monthly trends</span>
              </div>
            </div>
            
            <div className="main-charts-grid">
              <CrimeTrendChart />
              <CrimePieChart />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "24px" }} className="district-hotspots-grid">
              <DistrictCrimeChart />
              <div className="dashboard-card">
                <CrimeTable />
              </div>
            </div>
          </div>
        );

      case "hotspots":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div className="dashboard-header">
              <div className="dashboard-title-area">
                <h2>Tactical Hotspot Registry</h2>
                <span className="dashboard-subtitle">Real-time dispatch and active patrolling sectors</span>
              </div>
            </div>
            <div className="main-charts-grid">
              <CrimeHotspots />
              {/* Hotspot prediction map placeholder */}
              <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", gap: "15px", height: "100%", justifyContent: "space-between" }}>
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">
                    <Cpu size={18} className="text-secondary" style={{ animation: "pulse 2s infinite" }} />
                    AI Hotspot Projection
                  </h3>
                </div>
                <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed var(--border-color)", borderRadius: "var(--radius-md)", padding: "30px", textAlign: "center", backgroundColor: "#f8fafc" }}>
                  <Map size={48} className="text-muted" style={{ marginBottom: "15px" }} />
                  <h4 style={{ color: "var(--color-primary)", fontWeight: "700" }}>AI Predictive Scanning Grid</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", maxWidth: "250px", marginTop: "5px" }}>
                    Projections suggest Whitefield / Indiranagar Zone B Burglary Risk at 88% probability over next 48h.
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)", borderTop: "1px solid var(--border-color)", paddingTop: "12px" }}>
                  <span>Model Confidence: <strong>92%</strong></span>
                  <span style={{ color: "var(--danger)" }}>● Threat Elevated</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "district-analysis":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div className="dashboard-header">
              <div className="dashboard-title-area">
                <h2>Regional District Performance</h2>
                <span className="dashboard-subtitle">Drilldown analysis of cases, major offenses, and regional risk cards</span>
              </div>
            </div>
            
            {/* Full-width District Cards list to avoid cramped wrapping */}
            <div style={{ width: "100%" }}>
              <DistrictDrilldown searchQuery={searchQuery} />
            </div>

            {/* Charts side by side */}
            <div className="main-charts-grid">
              <DistrictCrimeChart />
              <CrimeBarChart />
            </div>
          </div>
        );

      case "recent-cases":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div className="dashboard-header">
              <div className="dashboard-title-area">
                <h2>Incident Registry Log</h2>
                <span className="dashboard-subtitle">Search, filter and verify officer assignments, case numbers, and status badges</span>
              </div>
            </div>
            
            {/* Live Dispatch Feed and Crime Records */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
              <CrimeRecordsTable searchQuery={searchQuery} />
              
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                <button onClick={() => handleOpenCaseDetail("KSP-2026-049")} className="pagination-btn" style={{ fontSize: "0.8rem" }}>Inspect KSP-2026-049</button>
                <button onClick={() => handleOpenCaseDetail("KSP-2026-048")} className="pagination-btn" style={{ fontSize: "0.8rem" }}>Inspect KSP-2026-048</button>
              </div>
            </div>

            <div className="tables-grid">
              <RecentCasesTable searchQuery={searchQuery} />
              <div className="dashboard-card">
                <RecentCases />
              </div>
            </div>
          </div>
        );

      case "ai-insights":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div className="dashboard-header">
              <div className="dashboard-title-area">
                <h2>AI Crime Intelligence</h2>
                <span className="dashboard-subtitle">Forecasting engine, threat spike logs, and predictive risk indicators</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "24px" }} className="district-hotspots-grid">
              <PredictiveAnalytics />
              <AIInsightsPanel />
            </div>
          </div>
        );

      case "settings":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div className="dashboard-header">
              <div className="dashboard-title-area">
                <h2>Settings Portal</h2>
                <span className="dashboard-subtitle">Manage officer rank details, alerts profile, and system configurations</span>
              </div>
            </div>
            <Settings />
          </div>
        );

      case "overview":
      default:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "30px", animation: "fadeIn 0.3s ease-in-out" }}>
            {/* Page Header */}
            <div className="dashboard-header">
              <div className="dashboard-title-area">
                <h2>KSP Command Center Overview</h2>
                <span className="dashboard-subtitle">Karnataka State Police (KSP) Crime Intelligence & Proactive Analytics System</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button 
                  onClick={() => setActiveTab("recent-cases")} 
                  className="pagination-btn" 
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Database size={14} /> Case Registry
                </button>
                <button 
                  onClick={() => setActiveTab("ai-insights")} 
                  className="pagination-btn" 
                  style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "var(--color-accent)", color: "white", borderColor: "var(--color-accent)" }}
                >
                  <Sparkles size={14} /> AI Forecasts
                </button>
              </div>
            </div>

            {/* KPI Stats Cards - Preserving previous values */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <StatsCard title="Total Crimes" value="10" />
              <StatsCard title="Active Investigations" value="5" />
              <StatsCard title="Crime Hotspots" value="3" />
              <StatsCard title="High Risk Districts" value="2" />
              <StatsCard title="Police Stations Covered" value="10" />
              <StatsCard title="Total Victims" value="0" />
              <StatsCard title="Total Accused" value="0" />
            </div>

            {/* Middle Section: Trend and Distribution Charts */}
            <div className="main-charts-grid">
              <CrimeTrendChart />
              <CrimePieChart />
            </div>

            {/* District analysis and map section */}
            <div className="district-hotspots-grid">
              <DistrictCrimeChart />
              <CrimeHotspots />
            </div>

            {/* AI Insights & Predictive Teasers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="district-hotspots-grid">
              <PredictiveAnalytics />
              <AIInsightsPanel />
            </div>

            {/* Records and Live Dispatch log */}
            <div className="tables-grid">
              <CrimeRecordsTable searchQuery={searchQuery} />
              <RecentCasesTable searchQuery={searchQuery} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container" style={{ position: "relative" }}>
      {renderTabContent()}

      {/* Case Details Inspector Modal */}
      {selectedCaseDetail && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(11,19,43,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifySpace: "center", zIndex: 1000 }}>
          <div className="dashboard-card" style={{ maxWidth: "500px", width: "90%", padding: "28px", boxShadow: "var(--shadow-lg)", position: "relative", animation: "scaleUp 0.2s ease-in-out", margin: "auto" }}>
            <button 
              onClick={() => setSelectedCaseDetail(null)} 
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}
            >
              <X size={20} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <ShieldAlert className="text-secondary" size={22} />
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "800" }}>Case File: {selectedCaseDetail.id}</h3>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem" }}>
              <div>
                <strong>Incident Profile:</strong>
                <p style={{ margin: "2px 0 0 0", color: "var(--text-secondary)" }}>{selectedCaseDetail.title}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <strong>Officer In Charge:</strong>
                  <p style={{ margin: "2px 0 0 0", color: "var(--text-secondary)" }}>{selectedCaseDetail.officer}</p>
                </div>
                <div>
                  <strong>Police Station:</strong>
                  <p style={{ margin: "2px 0 0 0", color: "var(--text-secondary)" }}>{selectedCaseDetail.station}</p>
                </div>
              </div>
              <div>
                <strong>Case Brief:</strong>
                <p style={{ margin: "2px 0 0 0", color: "var(--text-secondary)", lineHeight: "1.5" }}>{selectedCaseDetail.description}</p>
              </div>
              <div style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                <strong>Command Notes:</strong>
                <p style={{ margin: "2px 0 0 0", color: "var(--color-primary)", fontWeight: "600" }}>{selectedCaseDetail.notes}</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedCaseDetail(null)} 
              className="pagination-btn" 
              style={{ width: "100%", marginTop: "20px", backgroundColor: "var(--bg-sidebar)", color: "white" }}
            >
              Close Briefing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;