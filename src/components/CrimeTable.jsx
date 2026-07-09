import { crimeTypeData } from "../data/crimeData";

function CrimeTable() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Crime Records</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Crime Type</th>
            <th>Total Cases</th>
          </tr>
        </thead>

        <tbody>
          {crimeTypeData.map((crime, index) => (
            <tr key={index}>
              <td>{crime.name}</td>
              <td>{crime.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrimeTable;