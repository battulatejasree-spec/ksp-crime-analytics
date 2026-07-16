import { useState, useEffect } from "react";
import { Shield, Eye, EyeOff, Lock, User } from "lucide-react";

const KSP_EMBLEM_SVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="46" fill="#081229" stroke="#fbbf24" stroke-width="3"/>
  <path d="M50 18 L68 28 V52 C68 64 50 78 50 78 C50 78 32 64 32 52 V28 L50 18 Z" fill="#1e3a8a" stroke="#fbbf24" stroke-width="2"/>
  <path d="M50 25 L55 35 H65 L57 42 L60 52 L50 45 L40 52 L43 42 L35 35 H45 L50 25 Z" fill="#fbbf24"/>
  <text x="50" y="88" font-family="system-ui" font-size="7" font-weight="900" fill="#fbbf24" text-anchor="middle">K.S.P.</text>
</svg>`;

function Login({ onLogin }) {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const credentialDatabase = {
    admin: { password: "admin123", name: "IGP Alok Kumar", role: "Admin", badge: "KSP-IGP-01" },
    inspector: { password: "inspector123", name: "Inspector Tejasree", role: "Inspector", badge: "KSP-INS-24" },
    officer: { password: "1234", name: "Sub-Inspector Rajesh", role: "Officer", badge: "KSP-OFF-88" }
  };

  useEffect(() => {
    const savedId = localStorage.getItem("rememberedOfficerId");
    if (savedId) {
      setOfficerId(savedId);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = officerId.toLowerCase().trim();
    const match = credentialDatabase[id];

    if (match && match.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify({
        name: match.name,
        role: match.role,
        badge: match.badge
      }));

      if (rememberMe) {
        localStorage.setItem("rememberedOfficerId", officerId);
      } else {
        localStorage.removeItem("rememberedOfficerId");
      }

      setErrorMsg("");
      onLogin();
    } else {
      setErrorMsg("Access Denied: Invalid Badge ID or Cryptographic Key.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #081229 0%, #0f172a 100%)",
      padding: "20px",
      fontFamily: "var(--font-body)"
    }}>
      <div style={{
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        width: "100%",
        maxWidth: "420px",
        padding: "40px",
        textAlign: "center",
        color: "#ffffff"
      }}>
        {/* Emblem Section */}
        <div style={{ width: "80px", height: "80px", margin: "0 auto 20px" }} dangerouslySetInnerHTML={{ __html: KSP_EMBLEM_SVG }} />
        
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fbbf24", margin: "0 0 4px 0", fontFamily: "var(--font-heading)" }}>KARNATAKA STATE POLICE</h2>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "30px", fontWeight: "600", letterSpacing: "1px" }}>CRIME INTELLIGENCE COMMAND CENTER</p>

        {errorMsg && (
          <div style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid #ef4444",
            color: "#fca5a5",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            marginBottom: "20px",
            textAlign: "left"
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
          {/* Badge Input */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "6px", fontWeight: "600" }}>OFFICER BADGE ID</label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
              <input
                type="text"
                placeholder="Enter badge ID (e.g. officer, admin)"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  color: "#ffffff",
                  outline: "none",
                  fontSize: "0.9rem"
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "6px", fontWeight: "600" }}>SECURITY PASSWORD</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter security key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 40px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  color: "#ffffff",
                  outline: "none",
                  fontSize: "0.9rem"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#64748b",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me option */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: "pointer" }}
              />
              Remember Identity
            </label>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "14px",
              fontSize: "0.95rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "background-color 0.2s",
              boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
              marginTop: "10px"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
          >
            AUTHORIZE & ENTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;