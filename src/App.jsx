import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { 
  ShieldAlert, 
  LayoutDashboard, 
  MapPin, 
  Database, 
  BarChart3, 
  Settings as SettingsIcon, 
  Bell, 
  Search, 
  Menu, 
  User,
  Power,
  Landmark,
  Clock,
  Brain,
  Shield,
  Sun,
  Moon,
  ChevronDown,
  History
} from "lucide-react";
import "./App.css";

// Government logo crest SVG string
const KSP_EMBLEM_SVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="46" fill="#081229" stroke="#fbbf24" stroke-width="3"/>
  <path d="M50 18 L68 28 V52 C68 64 50 78 50 78 C50 78 32 64 32 52 V28 L50 18 Z" fill="#1e3a8a" stroke="#fbbf24" stroke-width="2"/>
  <path d="M50 25 L55 35 H65 L57 42 L60 52 L50 45 L40 52 L43 42 L35 35 H45 L50 25 Z" fill="#fbbf24"/>
  <text x="50" y="88" font-family="system-ui" font-size="7" font-weight="900" fill="#fbbf24" text-anchor="middle">K.S.P.</text>
</svg>`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "Officer", role: "Officer", badge: "KSP-OFF-88" });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Search history and dropdown states
  const [searchHistory, setSearchHistory] = useState(["KSP-2026-049", "Bangalore", "Cyber Crime"]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  // Theme state
  const [theme, setTheme] = useState("light");

  // Dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Cyber Spike Alert", desc: "+35% phishing reports in Bangalore East", unread: true, time: "10m ago" },
    { id: 2, title: "Hotspot Scan Elevated", desc: "Whitefield zone projected at 88% burglary risk", unread: true, time: "1h ago" },
    { id: 3, title: "Officer Assigned", desc: "SI Rajesh dispatched to gold heist recovery", unread: false, time: "3h ago" },
    { id: 4, title: "System Database Sync", desc: "Catalyst audit logs synchronized successfully", unread: false, time: "12h ago" }
  ]);

  const searchContainerRef = useRef(null);

  // Auto suggestions database
  const suggestionData = [
    { text: "KSP-2026-049", category: "FIR Number" },
    { text: "KSP-2026-048", category: "FIR Number" },
    { text: "Bengaluru Urban", category: "District" },
    { text: "Mysore District", category: "District" },
    { text: "Cyber Crime", category: "Crime Type" },
    { text: "Robbery", category: "Crime Type" },
    { text: "Inspector Tejasree", category: "Officer" },
    { text: "Sub-Inspector Rajesh", category: "Officer" }
  ];

  // Sync session and theme settings
  useEffect(() => {
    // Dynamic Favicon Crest
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = `data:image/svg+xml,${encodeURIComponent(KSP_EMBLEM_SVG)}`;
    document.getElementsByTagName('head')[0].appendChild(link);

    // Check Auth status
    const authStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authStatus);
    if (authStatus) {
      loadUserData();
    }

    // Check theme status
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Profile updates listener
    const handleUserUpdate = () => {
      loadUserData();
    };
    window.addEventListener("userUpdate", handleUserUpdate);

    // Hide search dropdown on click outside
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("userUpdate", handleUserUpdate);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoggedIn]);

  // Session Inactivity Logout timer (15 minutes)
  useEffect(() => {
    if (!isLoggedIn) return;

    let inactivityTimeout;
    const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes

    const resetTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        handleLogout();
        alert("Session expired due to inactivity. Please log in again.");
      }, TIMEOUT_DURATION);
    };

    const trackedEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    trackedEvents.forEach(evt => window.addEventListener(evt, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(inactivityTimeout);
      trackedEvents.forEach(evt => window.removeEventListener(evt, resetTimer));
    };
  }, [isLoggedIn]);

  const loadUserData = () => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
    setActiveTab("overview");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Autocomplete search suggestions trigger
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (!val) {
      setSearchSuggestions([]);
      return;
    }
    const filtered = suggestionData.filter(item => 
      item.text.toLowerCase().includes(val.toLowerCase())
    );
    setSearchSuggestions(filtered);
  };

  const handleSelectSuggestion = (text) => {
    setSearchQuery(text);
    setShowSearchDropdown(false);
    // Add to history list
    if (!searchHistory.includes(text)) {
      setSearchHistory(prev => [text, ...prev.slice(0, 4)]);
    }
  };

  // Notifications summary
  const unreadCount = notifications.filter(n => n.unread).length;
  
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "analytics", label: "Crime Analytics", icon: BarChart3 },
    { id: "hotspots", label: "Hotspots", icon: MapPin },
    { id: "district-analysis", label: "District Analysis", icon: Landmark },
    { id: "recent-cases", label: "Recent Cases", icon: Clock },
    { id: "ai-insights", label: "AI Insights", icon: Brain },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      {/* Sidebar with Emblem */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header" style={{ padding: "10px 16px" }}>
          <div className="sidebar-logo-container" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div 
              style={{ width: "38px", height: "38px" }} 
              dangerouslySetInnerHTML={{ __html: KSP_EMBLEM_SVG }} 
            />
            {!isCollapsed && (
              <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: "1.1" }}>
                <span style={{ fontSize: "1rem", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-heading)" }}>KSP Analytics</span>
                <span style={{ fontSize: "0.6rem", color: "#fbbf24", fontWeight: "700", letterSpacing: "0.5px" }}>KARNATAKA POLICE</span>
              </div>
            )}
          </div>
          <button className="sidebar-toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)} title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            <Menu size={18} />
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
          <div className="sidebar-footer-info" style={{ textAlign: "left" }}>
            <span className="sidebar-footer-name" style={{ display: "block", textOverflow: "ellipsis", overflow: "hidden", maxWidth: "150px" }}>{currentUser.name}</span>
            <span className="sidebar-footer-role" style={{ fontSize: "0.75rem", color: "#fbbf24" }}>{currentUser.role}</span>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className={`main-wrapper ${isCollapsed ? "expanded" : ""}`}>
        {/* Top Navbar */}
        <header className="top-bar">
          {/* Autocomplete Global Search */}
          <div className="top-bar-search" ref={searchContainerRef}>
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search case no, district, type, or officer..." 
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
            />
            {/* Search Suggestions & History Dropdown */}
            <AnimatePresence>
              {showSearchDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="search-suggestions-dropdown"
                >
                  {searchSuggestions.length > 0 ? (
                    searchSuggestions.map((item, idx) => (
                      <div key={idx} className="search-suggestion-item" onClick={() => handleSelectSuggestion(item.text)}>
                        <span style={{ fontWeight: "600", fontSize: "0.85rem" }}>{item.text}</span>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", backgroundColor: "var(--color-accent-light)", padding: "2px 6px", borderRadius: "4px" }}>{item.category}</span>
                      </div>
                    ))
                  ) : searchQuery ? (
                    <div style={{ padding: "12px", fontSize: "0.8rem", color: "var(--text-secondary)", textAlign: "center" }}>
                      No matching records found
                    </div>
                  ) : (
                    <div>
                      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border-color)", fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Clock size={12} /> Search History
                      </div>
                      {searchHistory.map((item, idx) => (
                        <div key={idx} className="search-suggestion-item" onClick={() => handleSelectSuggestion(item)}>
                          <span style={{ fontSize: "0.85rem" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="top-bar-actions" style={{ position: "relative" }}>
            {/* Government Emblem Icon Badge */}
            <div 
              style={{ width: "28px", height: "28px" }} 
              dangerouslySetInnerHTML={{ __html: KSP_EMBLEM_SVG }} 
            />

            <div className="system-status-indicator">
              <span className="status-dot"></span>
              <span>Central Ops Hub</span>
            </div>

            {/* Theme Toggle Button */}
            <button className="top-bar-btn" onClick={toggleTheme} title="Switch Operations Theme">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} style={{ color: "#fbbf24" }} />}
            </button>

            {/* Notifications Alert Bell */}
            <button className="top-bar-btn" onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }} title="Notification Center">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="badge-dot" style={{ display: "flex", alignItems: "center", justifySpace: "center", width: "16px", height: "16px", background: "var(--danger)", color: "white", fontSize: "0.6rem", fontWeight: "800", borderRadius: "50%", top: "4px", right: "4px" }}>
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown Panel */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="notification-dropdown"
                >
                  <div className="notification-header">
                    <span style={{ fontWeight: "700", fontSize: "0.9rem" }}>Dispatch Alerts Feed</span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={markAllNotificationsRead} style={{ background: "none", border: "none", color: "var(--color-accent)", fontSize: "0.75rem", cursor: "pointer", fontWeight: "600" }}>Read All</button>
                      <button onClick={clearAllNotifications} style={{ background: "none", border: "none", color: "var(--danger)", fontSize: "0.75rem", cursor: "pointer", fontWeight: "600" }}>Clear</button>
                    </div>
                  </div>
                  <div className="notification-list">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div key={n.id} className={`notification-item ${n.unread ? "unread" : ""}`}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px", flexGrow: 1, textAlign: "left" }}>
                            <span style={{ fontWeight: "700", fontSize: "0.85rem", color: "var(--text-primary)" }}>{n.title}</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{n.desc}</span>
                            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "4px" }}>{n.time}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: "30px", color: "var(--text-secondary)", textAlign: "center", fontSize: "0.85rem" }}>
                        No new logs or dispatch warnings
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Officer Profile & Action Dropdown */}
            <div 
              style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "4px 8px", borderRadius: "20px", transition: "var(--transition-fast)" }} 
              onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            >
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--color-accent)", color: "white", display: "flex", alignItems: "center", justifySpace: "center", fontWeight: "700", fontSize: "0.85rem" }}>
                {currentUser.name[0]}
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>{currentUser.name.split(" ")[0]}</span>
              <ChevronDown size={14} className="text-secondary" />
            </div>

            {/* Profile Dropdown Panel */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="profile-dropdown-menu"
                >
                  <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border-color)", textAlign: "left" }}>
                    <span style={{ fontWeight: "700", fontSize: "0.85rem", display: "block" }}>{currentUser.name}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Badge: {currentUser.badge}</span>
                  </div>
                  <button className="profile-dropdown-item" onClick={() => { setActiveTab("settings"); setShowProfileMenu(false); }}>
                    <User size={16} /> My Profile
                  </button>
                  <button className="profile-dropdown-item" onClick={() => { setActiveTab("settings"); setShowProfileMenu(false); }}>
                    <SettingsIcon size={16} /> Settings
                  </button>
                  <button className="profile-dropdown-item" onClick={() => { setActiveTab("recent-cases"); setShowProfileMenu(false); }}>
                    <Clock size={16} /> Activity Logs
                  </button>
                  <button className="profile-dropdown-item" onClick={() => setShowLogoutConfirm(true)} style={{ color: "var(--danger)", borderTop: "1px solid var(--border-color)", marginTop: "4px" }}>
                    <Power size={16} /> Logout Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Content View Area */}
        <div className="content-area">
          <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} />
        </div>
      </main>

      {/* Logout Confirmation Dialog */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(11,19,43,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifySpace: "center", zIndex: 1000 }}>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="dashboard-card" 
              style={{ maxWidth: "400px", width: "90%", padding: "30px", textAlign: "center", margin: "auto" }}
            >
              <ShieldAlert size={48} className="text-secondary" style={{ margin: "0 auto 15px", color: "var(--danger)" }} />
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--color-primary)" }}>Confirm Tactical Logout</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "8px", marginBottom: "24px" }}>
                You are about to terminate this policing session. All uncommitted audit logs and settings will be secured.
              </p>
              <div style={{ display: "flex", gap: "12px", justifySpace: "center" }}>
                <button onClick={() => setShowLogoutConfirm(false)} className="pagination-btn" style={{ flexGrow: 1 }}>
                  Cancel
                </button>
                <button onClick={handleLogout} className="pagination-btn" style={{ flexGrow: 1, backgroundColor: "var(--danger)", color: "white", borderColor: "var(--danger)" }}>
                  Logout Session
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;