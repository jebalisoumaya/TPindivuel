import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8090/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        alert("Connexion réussie!");
        localStorage.setItem("token", response.data.token);
        navigate("/acceuil");
      })
      .catch((error) => {
        alert("Error while connecting");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e4f0d0",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            color: "#4c9a2a",

            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Login To Buy&Bye
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: "500",
              color: "#4c9a2a",
              marginBottom: "5px",
            }}
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "16px",
              color: "#555",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4c9a2a")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: "500",
              color: "#4c9a2a",
              marginBottom: "5px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "16px",
              color: "#555",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4c9a2a")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#4c9a2a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c823d")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4c9a2a")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
