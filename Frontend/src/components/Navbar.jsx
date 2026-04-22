import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <h2>Civic System</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/feed">Issues</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}