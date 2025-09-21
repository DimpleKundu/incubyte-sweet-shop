import { Link } from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="shop-name">🍬 SugarBloom</h1>
        <p className="shop-tagline">
          Indulge in the sweetest treats 🍭 & delightful bakery creations 🍰
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="cta-btn register-btn">
            🍭 Join Us
          </Link>
          <Link to="/login" className="cta-btn login-btn">
            🍪 Login
          </Link>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="quick-links">
        <h2>Explore Our Shop</h2>
        <nav>
          <Link to="/dashboard" className="link-btn">Dashboard</Link>
          <Link to="/register" className="link-btn">Register</Link>
          <Link to="/login" className="link-btn">Login</Link>
        </nav>
        
      </div>
      <div className="credit-badge">made by Dimple</div>

    </div>
  );
}
