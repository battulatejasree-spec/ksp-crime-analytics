import DistrictCrimeChart from "../components/DistrictCrimeChart";
import CrimeTrendChart from "../components/CrimeTrendChart";
import CrimePieChart from "../components/CrimePieChart";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  return (
    <div>
      <h2>Crime Dashboard</h2>

      <div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  }}
>
        <StatsCard title="Total Crimes" value="10" />
        <StatsCard title="Total Victims" value="0" />
        <StatsCard title="Total Accused" value="0" />
        <StatsCard title="Police Stations" value="10" />
      </div>
      <h2 style={{ marginTop: "40px" }}>Crime Distribution</h2>
<CrimePieChart />
<h2 style={{ marginTop: "40px" }}>Crime Trend</h2>
<CrimeTrendChart />
  <h2 style={{ marginTop: "40px" }}>District-wise Crime Analysis</h2>
<DistrictCrimeChart />
    </div>

  );
}

export default Dashboard;