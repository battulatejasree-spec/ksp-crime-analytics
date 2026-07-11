import { useState, useEffect } from "react";
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, FileText } from "lucide-react";

// Mock data: 10 cases consistent with KSP command numbers and stats
const initialRecords = [
  { id: "KSP-2026-049", date: "2026-07-08", type: "Cyber Crime", district: "Bengaluru Urban", station: "Indiranagar PS", status: "Investigation", risk: "Medium" },
  { id: "KSP-2026-048", date: "2026-07-08", type: "Murder", district: "Mysore District", station: "Mysore Town PS", status: "Pending", risk: "High" },
  { id: "KSP-2026-047", date: "2026-07-07", type: "Robbery", district: "Hubli-Dharwad Metro", station: "Hubli Division PS", status: "Solved", risk: "High" },
  { id: "KSP-2026-046", date: "2026-07-06", type: "Fraud", district: "Bengaluru Urban", station: "Halasuru PS", status: "Solved", risk: "Medium" },
  { id: "KSP-2026-045", date: "2026-07-05", type: "Kidnapping", district: "Belgaum Rural", station: "Belgaum Central PS", status: "Investigation", risk: "High" },
  { id: "KSP-2026-044", date: "2026-07-04", type: "Cyber Crime", district: "Mangalore Coastal Sector", station: "Mangalore North PS", status: "Solved", risk: "Low" },
  { id: "KSP-2026-043", date: "2026-07-03", type: "Fraud", district: "Mysore District", station: "Mysore South PS", status: "Pending", risk: "Low" },
  { id: "KSP-2026-042", date: "2026-07-02", type: "Robbery", district: "Bengaluru Urban", station: "Koramangala PS", status: "Solved", risk: "Medium" },
  { id: "KSP-2026-041", date: "2026-07-01", type: "Cyber Crime", district: "Hubli-Dharwad Metro", station: "Hubli West PS", status: "Investigation", risk: "Medium" },
  { id: "KSP-2026-040", date: "2026-06-30", type: "Fraud", district: "Belgaum Rural", station: "Belgaum Rural PS", status: "Solved", risk: "Low" }
];

function CrimeRecordsTable({ searchQuery = "" }) {
  const [records, setRecords] = useState(initialRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sync with global search if passed
  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDistrict("All");
    setSelectedType("All");
    setCurrentPage(1);
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch = 
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.station.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDistrict = selectedDistrict === "All" || record.district === selectedDistrict;
    const matchesType = selectedType === "All" || record.type === selectedType;

    return matchesSearch && matchesDistrict && matchesType;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Solved":
        return <span className="badge success">Solved</span>;
      case "Investigation":
        return <span className="badge warning">Investigation</span>;
      case "Pending":
        return <span className="badge danger">Pending</span>;
      default:
        return <span className="badge info">{status}</span>;
    }
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "High":
        return <span style={{ color: "#ef4444", fontWeight: "600" }}>● High</span>;
      case "Medium":
        return <span style={{ color: "#f59e0b", fontWeight: "600" }}>● Medium</span>;
      case "Low":
        return <span style={{ color: "#10b981", fontWeight: "600" }}>● Low</span>;
      default:
        return <span>{risk}</span>;
    }
  };

  return (
    <div className="dashboard-card" style={{ height: "100%" }}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">
          <FileText size={18} className="text-secondary" />
          KSP Crime Registry Logs
        </h3>
        <button 
          onClick={handleReset} 
          className="top-bar-btn" 
          title="Reset"
          style={{ width: "32px", height: "32px" }}
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="table-controls">
        <div className="table-search-input">
          <Search size={14} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search Crime No, Station..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="table-filters">
          <select 
            className="table-select"
            value={selectedDistrict} 
            onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Districts</option>
            <option value="Bengaluru Urban">Bengaluru Urban</option>
            <option value="Mysore District">Mysore District</option>
            <option value="Hubli-Dharwad Metro">Hubli Metro</option>
            <option value="Belgaum Rural">Belgaum Rural</option>
            <option value="Mangalore Coastal Sector">Mangalore</option>
          </select>

          <select 
            className="table-select"
            value={selectedType} 
            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Offenses</option>
            <option value="Cyber Crime">Cyber Crime</option>
            <option value="Murder">Murder</option>
            <option value="Robbery">Robbery</option>
            <option value="Fraud">Fraud</option>
            <option value="Kidnapping">Kidnapping</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Crime No</th>
              <th>Crime Type</th>
              <th>District</th>
              <th>Police Station</th>
              <th>Date</th>
              <th>Status</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((record) => (
                <tr key={record.id}>
                  <td style={{ fontWeight: "600", color: "#1e3a8a" }}>{record.id}</td>
                  <td>{record.type}</td>
                  <td>{record.district}</td>
                  <td style={{ fontWeight: "500" }}>{record.station}</td>
                  <td>{record.date}</td>
                  <td>{getStatusBadge(record.status)}</td>
                  <td>{getRiskBadge(record.risk)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px 0" }}>
                  No case records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <span>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRecords.length)} of {filteredRecords.length} records
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrimeRecordsTable;
