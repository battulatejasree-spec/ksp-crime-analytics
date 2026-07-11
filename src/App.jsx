import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import { 
  ShieldAlert, 
  LayoutDashboard, 
  MapPin, 
  Database, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  User,
  Power,
  Landmark,
  Clock,
  Brain
} from "lucide-react";
import "./App.css";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "analytics", label: "Crime Analytics", icon: BarChart3 },
    { id: "hotspots", label: "Hotspots", icon: MapPin },
    { id: "district-analysis", label: "District Analysis", icon: Landmark },
    { id: "recent-cases", label: "Recent Cases", icon: Clock },
    { id: "ai-insights", label: "AI Insights", icon: Brain },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-container">
            <span className="sidebar-logo-badge">KSP</span>
            <span className="sidebar-header-title">Crime Analytics</span>
          </div>
          <button className="sidebar-toggle-btn" onClick={toggleSidebar} title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            <Menu size={20} />
          </button>
        </div>

        <nav className="sidebar-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`sidebar-item ${activeTab === item.id ? "active" : ""}`}
                title={item.label}
              >
                <Icon size={20} />
                <span className="sidebar-item-text">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-avatar">
            <User size={18} />
          </div>
          <div className="sidebar-footer-info">
            <span className="sidebar-footer-name">IGP Alok Kumar</span>
            <span className="sidebar-footer-role">Command Center Officer</span>
          </div>
        </div>
      </aside>

      {/* Main Wrapper */}
      <main className={`main-wrapper ${isCollapsed ? "expanded" : ""}`}>
        {/* Top Header */}
        <header className="top-bar">
          <div className="top-bar-search">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search case file, district, or crime code..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="top-bar-actions">
            <div className="system-status-indicator">
              <span className="status-dot"></span>
              <span>Command Center Online</span>
            </div>
            
            <button className="top-bar-btn" title="View Notifications">
              <Bell size={20} />
              <span className="badge-dot"></span>
            </button>

            <button className="top-bar-btn" title="Logout Session" style={{ color: "#ef4444" }}>
              <Power size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  );
}

export default App;