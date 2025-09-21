import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, { email, password });
      alert("Registered! Now login.");
      navigate("/login");
    } catch (err) {
      alert("Error: " + (err.response?.data?.detail || "Something went wrong"));
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Branding */}
      <div className="auth-left">
        <div className="icon">🍩</div>
        <h1>Join the Sweet Shop</h1>
        <p>Create your account and start shopping for delightful sweets 🍭🍰</p>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="form-box">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">🍭 Register</button>
          </form>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#f59e0b", fontWeight: "600" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
