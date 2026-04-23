import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const role = user?.role;

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="nav">

      {/* LOGO */}
      <h2 className="logo" onClick={() => navigate("/")}>
        Civic<span>+</span>
      </h2>

      {/* LINKS */}
      <div className="nav-links">

        {/* 👤 CITIZEN */}
        {role === "citizen" && (
          <>
            <Link className={location.pathname === "/home" ? "active" : ""} to="/home">
              Home
            </Link>

            <Link className={location.pathname === "/feed" ? "active" : ""} to="/feed">
              Issues
            </Link>

            <Link className={location.pathname === "/news" ? "active" : ""} to="/news">
              News
            </Link>
          </>
        )}

        {/* 👮 ADMIN */}
        {role === "admin" && (
          <>
            <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
              Dashboard
            </Link>

            <Link className={location.pathname === "/admin/issues" ? "active" : ""} to="/admin/issues">
              Manage
            </Link>

            <Link className={location.pathname === "/map" ? "active" : ""} to="/map">
              Map
            </Link>

            <Link className={location.pathname === "/news" ? "active" : ""} to="/news">
              News
            </Link>
          </>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="nav-actions">
        <span className="user-role">
          {role === "admin" ? "GRO" : "Citizen"}
        </span>

        <button className="nav-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>
  );
}