import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Username:", username);
  console.log("Password:", password);

  if (username === "officer" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    onLogin();
  } else {
    alert("Invalid Credentials");
  }
};

  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        maxWidth: "400px",
        margin: "100px auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Officer Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Officer ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;