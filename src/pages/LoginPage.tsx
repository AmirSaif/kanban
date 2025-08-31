import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "350px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          color: "#333",
        }}
      >
        Login
      </h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />

      <button
        type="submit"
        style={{
          backgroundColor: "#007BFF",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onMouseOver={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#0056b3")
        }
        onMouseOut={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#007BFF")
        }
      >
        Login
      </button>
    </form>
  );
}
