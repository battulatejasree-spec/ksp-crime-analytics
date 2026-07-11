import CrimeHotspots from "../components/CrimeHotspots";
import RecentCases from "../components/RecentCases";
import CrimeTable from "../components/CrimeTable";
import DashboardCards from "../components/DashboardCards";
import DistrictCrimeChart from "../components/DistrictCrimeChart";
import CrimeTrendChart from "../components/CrimeTrendChart";
import CrimePieChart from "../components/CrimePieChart";
import StatsCard from "../components/StatsCard";
import CrimeRecordsTable from "../components/CrimeRecordsTable";
import RecentCasesTable from "../components/RecentCasesTable";
import AIInsightsPanel from "../components/AIInsightsPanel";
import DistrictDrilldown from "../components/DistrictDrilldown";
import PredictiveAnalytics from "../components/PredictiveAnalytics";
import { Database, Eye, Shield, Brain, Landmark, Clock, Settings, Sparkles, ShieldAlert } from "lucide-react";

function Dashboard({ activeTab = "overview", setActiveTab, searchQuery = "" }) {
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
            
            <div style={{ minHeight: "360px" }}>
              <DistrictCrimeChart />
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
            <div style={{ minHeight: "500px" }}>
              <CrimeHotspots />
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
            
            <div className="main-charts-grid">
              <DistrictDrilldown searchQuery={searchQuery} />
              <DistrictCrimeChart />
            </div>
          </div>
        );

      case "recent-cases":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div className="dashboard-header">
              <div className="dashboard-title-area">
                <h2>Recent Incident Log & Registries</h2>
                <span className="dashboard-subtitle">Real-time police dispatch feed, case records table, and historical listings</span>
              </div>
            </div>
            
            {/* Live Dispatch Feed and Crime Records */}
            <div className="tables-grid">
              <CrimeRecordsTable searchQuery={searchQuery} />
              <RecentCasesTable />
            </div>

            {/* Preserving existing basic table/recent cases elements */}
            <div className="tables-grid">
              <div className="dashboard-card">
                <RecentCases />
              </div>
              <div className="dashboard-card">
                <CrimeTable />
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
                <span className="dashboard-subtitle">Crime forecasting, predictive hotspot projections, and threat spike alerts</span>
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
          <div className="dashboard-card" style={{ padding: "40px", textAlign: "center", animation: "fadeIn 0.3s ease-in-out" }}>
            <Settings size={48} className="text-secondary" style={{ margin: "0 auto 20px", display: "block" }} />
            <h2>Command Center Settings</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "10px", maxWidth: "500px", margin: "10px auto 0" }}>
              Configure alert levels, patrol boundary radii, reporting schedules, and notification dispatch profiles for officer squads.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "24px" }}>
              <button className="pagination-btn" style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}>Backup Database</button>
              <button className="pagination-btn">Alert Rules</button>
            </div>
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

            {/* Preserved basic layout cards at top of overview */}
            <div style={{ paddingBottom: "10px" }}>
              <DashboardCards />
            </div>

            {/* KPI Stats Cards - Preserving previous + adding requested */}
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
              <RecentCasesTable />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {renderTabContent()}
    </div>
  );
}

export default Dashboard;