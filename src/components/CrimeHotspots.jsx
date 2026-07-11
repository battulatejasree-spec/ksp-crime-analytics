import { useState } from "react";
import { Map, AlertTriangle, Users, MapPin, Eye, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

const hotspotsData = [
  { id: "zone-1", name: "Bengaluru Urban (East)", risk: "Critical", incidents: 58, patrols: "5 Active Squads", trend: "up", x: 150, y: 70, r: 24 },
  { id: "zone-2", name: "Bengaluru Urban (North)", risk: "High", incidents: 45, patrols: "3 Active Squads", trend: "up", x: 80, y: 120, r: 18 },
  { id: "zone-3", name: "Mysore District", risk: "High", incidents: 33, patrols: "2 Active Squads", trend: "stable", x: 260, y: 180, r: 16 },
  { id: "zone-4", name: "Bengaluru Urban (South)", risk: "Moderate", incidents: 28, patrols: "2 Active Squads", trend: "down", x: 180, y: 190, r: 14 },
  { id: "zone-5", name: "Hubli-Dharwad Metro", risk: "Low", incidents: 12, patrols: "1 Patrol Unit", trend: "down", x: 320, y: 100, r: 10 }
];

function CrimeHotspots() {
  const [selectedZone, setSelectedZone] = useState(hotspotsData[0]);

  const getRiskColor = (risk) => {
    if (risk === "Critical" || risk === "High") return "danger";
    if (risk === "Moderate") return "warning";
    return "success";
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <span style={{ color: "var(--danger)", display: "flex", alignItems: "center", gap: "2px", fontSize: "0.75rem", fontWeight: "700" }}><ArrowUpRight size={14} /> Rising</span>;
      case "down":
        return <span style={{ color: "var(--success)", display: "flex", alignItems: "center", gap: "2px", fontSize: "0.75rem", fontWeight: "700" }}><ArrowDownRight size={14} /> Decreasing</span>;
      default:
        return <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "2px", fontSize: "0.75rem", fontWeight: "700" }}><Minus size={14} /> Stable</span>;
    }
  };

  return (
    <div className="dashboard-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">
          <Map size={18} className="text-secondary" />
          Tactical Patrol Hotspot Map & Cards
        </h3>
      </div>
      
      <div className="district-hotspots-grid" style={{ flexGrow: 1, gap: "24px" }}>
        {/* SVG Map Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <svg viewBox="0 0 400 240" className="hotspot-map-svg">
              <defs>
                <pattern id="hotspot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hotspot-grid)" />
              
              <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(37, 99, 235, 0.15)" strokeWidth="1.5" />
              <line x1="200" y1="0" x2="200" y2="240" stroke="rgba(37, 99, 235, 0.15)" strokeWidth="1.5" />
              <circle cx="200" cy="120" r="100" fill="none" stroke="rgba(37, 99, 235, 0.1)" strokeWidth="1" />
              
              {/* Boundary Polygons */}
              <polygon points="40,20 180,10 190,100 70,80" className="hotspot-zone" onClick={() => setSelectedZone(hotspotsData[1])} />
              <polygon points="180,10 320,30 290,120 190,100" className={`hotspot-zone ${selectedZone.id === "zone-1" ? "alert-high" : ""}`} onClick={() => setSelectedZone(hotspotsData[0])} />
              <polygon points="70,80 190,100 160,220 30,190" className="hotspot-zone" onClick={() => setSelectedZone(hotspotsData[3])} />
              <polygon points="190,100 290,120 360,210 160,220" className="hotspot-zone" onClick={() => setSelectedZone(hotspotsData[2])} />
              <polygon points="290,120 380,30 380,150 360,210" className="hotspot-zone" onClick={() => setSelectedZone(hotspotsData[4])} />

              {/* Beacon Radar Pings */}
              {hotspotsData.map((zone) => (
                <g key={zone.id} transform={`translate(${zone.x}, ${zone.y})`} style={{ cursor: "pointer" }} onClick={() => setSelectedZone(zone)}>
                  <circle cx="0" cy="0" r={zone.r * 1.5} className="hotspot-radar-ping" style={{ transformOrigin: "center" }} />
                  <circle cx="0" cy="0" r={zone.r / 3} className="hotspot-radar-center" />
                </g>
              ))}
            </svg>
          </div>
          
          {selectedZone && (
            <div style={{ padding: "14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", backgroundColor: "#f8fafc", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifySpace: "between", marginBottom: "8px" }}>
                <span style={{ fontWeight: "700", color: "var(--color-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={14} className="text-secondary" /> {selectedZone.name}
                </span>
                <span className={`badge ${getRiskColor(selectedZone.risk)}`}>{selectedZone.risk} Risk</span>
              </div>
              <div style={{ display: "flex", gap: "20px", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><AlertTriangle size={12} className="text-danger" /> {selectedZone.incidents} Crimes</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Users size={12} /> {selectedZone.patrols}</span>
              </div>
            </div>
          )}
        </div>

        {/* Hotspot Cards Side List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", maxHeight: "310px" }}>
          {hotspotsData.map((zone) => (
            <div 
              key={zone.id} 
              className={`hotspot-item ${getRiskColor(zone.risk)}`} 
              onClick={() => setSelectedZone(zone)}
              style={{ 
                cursor: "pointer", 
                backgroundColor: selectedZone.id === zone.id ? "#ffffff" : "var(--bg-primary)",
                borderRight: selectedZone.id === zone.id ? "3px solid var(--color-accent)" : "none",
                boxShadow: selectedZone.id === zone.id ? "var(--shadow-sm)" : "none",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--color-primary)" }}>{zone.name}</span>
                <span className={`badge ${getRiskColor(zone.risk)}`} style={{ fontSize: "0.65rem", padding: "2px 6px" }}>{zone.risk}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <strong>{zone.incidents}</strong> reported incidents
                </span>
                {getTrendIcon(zone.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CrimeHotspots;
