import CrimeBarChart from "./components/CrimeBarChart";
import DashboardCards from "./components/DashboardCards";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#1e293b",
          }}
        >
          KSP Crime Analytics Platform
        </h1>

        <DashboardCards />

        <Dashboard />

        <CrimeBarChart />
      </div>
    </div>
  );
}

export default App;