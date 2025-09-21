import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        { email: username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || "Error"));
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Branding */}
      <div className="auth-left">
        <div className="icon">🍪</div>
        <h1>Welcome to Sweet Shop</h1>
        <p>Discover and enjoy the finest sweets and bakery treats 🍩🍭</p>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="form-box">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">🍬 Login</button>
          </form>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            Not registered?{" "}
            <Link to="/register" style={{ color: "#ec4899", fontWeight: "600" }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
