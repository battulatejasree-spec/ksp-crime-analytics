import { useState, useEffect } from "react";
import { User, Shield, Bell, Database, Check } from "lucide-react";

function Settings() {
  const [activeSubTab, setActiveSubTab] = useState("profile");
  const [name, setName] = useState("IGP Alok Kumar");
  const [badge, setBadge] = useState("KSP-IGP-01");
  const [rank, setRank] = useState("Inspector General");
  const [email, setEmail] = useState("alok.kumar@ksp.gov.in");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [crimeSpikeAlerts, setCrimeSpikeAlerts] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(false);
  
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");
  
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="dashboard-card" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "30px", minHeight: "450px" }}>
      {/* Sidebar navigation inside settings card */}
      <div style={{ borderRight: "1px solid var(--border-color)", paddingRight: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <button 
          onClick={() => setActiveSubTab("profile")} 
          className="pagination-btn"
          style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: "8px", border: activeSubTab === "profile" ? "1px solid var(--color-accent)" : "1px solid var(--border-color)" }}
        >
          <User size={14} /> Profile Settings
        </button>
        <button 
          onClick={() => setActiveSubTab("security")} 
          className="pagination-btn"
          style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: "8px", border: activeSubTab === "security" ? "1px solid var(--color-accent)" : "1px solid var(--border-color)" }}
        >
          <Shield size={14} /> Security Settings
        </button>
        <button 
          onClick={() => setActiveSubTab("notifications")} 
          className="pagination-btn"
          style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: "8px", border: activeSubTab === "notifications" ? "1px solid var(--color-accent)" : "1px solid var(--border-color)" }}
        >
          <Bell size={14} /> Alerts Config
        </button>
        <button 
          onClick={() => setActiveSubTab("system")} 
          className="pagination-btn"
          style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: "8px", border: activeSubTab === "system" ? "1px solid var(--color-accent)" : "1px solid var(--border-color)" }}
        >
          <Database size={14} /> System Profile
        </button>
      </div>

      {/* Settings Form panel */}
      <div style={{ padding: "10px" }}>
        {showSavedToast && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "var(--success-bg)", color: "var(--success)", padding: "10px 14px", borderRadius: "6px", marginBottom: "15px", fontSize: "0.85rem", fontWeight: "600" }}>
            <Check size={16} /> Changes saved successfully to police database.
          </div>
        )}

        {activeSubTab === "profile" && (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>Official Profile Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Officer Name</label>
                <input type="text" className="table-select" style={{ width: "100%", padding: "8px" }} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Badge ID</label>
                <input type="text" className="table-select" style={{ width: "100%", padding: "8px" }} value={badge} onChange={(e) => setBadge(e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Rank / Designation</label>
                <input type="text" className="table-select" style={{ width: "100%", padding: "8px" }} value={rank} onChange={(e) => setRank(e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Official Email</label>
                <input type="email" className="table-select" style={{ width: "100%", padding: "8px" }} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="pagination-btn" style={{ width: "max-content", alignSelf: "flex-end", backgroundColor: "var(--color-accent)", color: "white", borderColor: "var(--color-accent)", marginTop: "10px" }}>
              Save Profile
            </button>
          </form>
        )}

        {activeSubTab === "security" && (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>Security & Credentials</h3>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Current Password</label>
              <input type="password" placeholder="••••••••" className="table-select" style={{ width: "100%", padding: "8px" }} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>New Password</label>
              <input type="password" placeholder="Min 8 characters" className="table-select" style={{ width: "100%", padding: "8px" }} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <button type="submit" className="pagination-btn" style={{ width: "max-content", alignSelf: "flex-end", backgroundColor: "var(--color-accent)", color: "white", borderColor: "var(--color-accent)", marginTop: "10px" }}>
              Update Password
            </button>
          </form>
        )}

        {activeSubTab === "notifications" && (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>Notification Alerts</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
                <span style={{ fontSize: "0.85rem" }}>Enable daily case summary reports (Email)</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" checked={crimeSpikeAlerts} onChange={(e) => setCrimeSpikeAlerts(e.target.checked)} />
                <span style={{ fontSize: "0.85rem" }}>Enable real-time crime spike dispatches</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" checked={aiAlerts} onChange={(e) => setAiAlerts(e.target.checked)} />
                <span style={{ fontSize: "0.85rem" }}>Receive predictive ML hotspot notifications</span>
              </label>
            </div>
            <button type="submit" className="pagination-btn" style={{ width: "max-content", alignSelf: "flex-end", backgroundColor: "var(--color-accent)", color: "white", borderColor: "var(--color-accent)", marginTop: "10px" }}>
              Save Alert Preferences
            </button>
          </form>
        )}

        {activeSubTab === "system" && (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>System Configurations</h3>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>System Theme Mode</label>
              <select className="table-select" style={{ width: "100%", padding: "8px" }} value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Command Center (Light)</option>
                <option value="dark">Tactical Night (Dark)</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>System Language</label>
              <select className="table-select" style={{ width: "100%", padding: "8px" }} value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="English">English</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button type="button" className="pagination-btn" style={{ flex: 1, backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)" }}>Backup Database</button>
              <button type="submit" className="pagination-btn" style={{ flex: 1, backgroundColor: "var(--color-accent)", color: "white", borderColor: "var(--color-accent)" }}>Save Profile</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Settings;
