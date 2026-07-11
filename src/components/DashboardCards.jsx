function DashboardCards() {
  return (
    <div style={{
      display: "grid",
gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
      marginBottom: "20px"
    }}>
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <h3>Total Crimes</h3>
        <h1>1245</h1>
      </div>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <h3>Hotspots</h3>
        <h1>12</h1>
      </div>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <h3>Alerts</h3>
        <h1>5</h1>
      </div>
    </div>
  );
}

export default DashboardCards;