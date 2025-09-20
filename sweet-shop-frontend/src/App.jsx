import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Sweet Shop</h1>
      <nav>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}
