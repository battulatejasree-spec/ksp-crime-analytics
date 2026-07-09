function CrimeHotspots() {
  const hotspots = [
    "Bengaluru Urban",
    "Whitefield",
    "Mysuru",
    "Mangaluru",
    "Hubballi",
  ];

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Crime Hotspots</h2>

      <ul>
        {hotspots.map((spot, index) => (
          <li key={index}>{spot}</li>
        ))}
      </ul>
    </div>
  );
}

export default CrimeHotspots;