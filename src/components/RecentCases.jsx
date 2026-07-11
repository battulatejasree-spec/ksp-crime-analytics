function RecentCases() {
  const cases = [
    {
      crimeNo: "CR001",
      type: "Murder",
      district: "Bengaluru Urban",
    },
    {
      crimeNo: "CR002",
      type: "Robbery",
      district: "Bengaluru Urban",
    },
    {
      crimeNo: "CR003",
      type: "Cyber Crime",
      district: "Bengaluru Urban",
    },
    {
      crimeNo: "CR004",
      type: "Drug Crime",
      district: "Mysuru",
    },
  ];

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Recent Cases</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Crime No</th>
            <th>Crime Type</th>
            <th>District</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((item, index) => (
            <tr key={index}>
              <td>{item.crimeNo}</td>
              <td>{item.type}</td>
              <td>{item.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentCases;