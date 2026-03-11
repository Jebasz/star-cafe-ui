import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaCashRegister,
  FaChartBar,
  FaSignOutAlt,
  FaStore,
  FaUserCircle
} from "react-icons/fa";

import { logout } from "../services/authService";
import logo from "../assets/Logo.png";

import "../styles/layout/header.css";

function Header() {

  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const isAdminPage = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <div className="app-header">

      {/* LEFT SIDE */}
      <div className="header-left">

        {!isAdminPage ? (
          <>
            <img
              src={logo}
              alt="Star Tea Park"
              className="header-logo"
            />

            <h5 className="header-title">
              STAR Tea Park
            </h5>
          </>
        ) : (
          <div className="header-spacer" />
        )}

      </div>

      {/* RIGHT NAVIGATION */}
      <div className="header-nav">

        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <FaCashRegister />
          Billing
        </Link>

        {!isAdminPage && (
          <Link
            to="/about"
            className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
          >
            <FaStore />
            About
          </Link>
        )}

        {role === "ADMIN" && (
          <Link
            to="/admin"
            className={`nav-link ${location.pathname.startsWith("/admin") ? "active" : ""}`}
          >
            <FaChartBar />
            Admin
          </Link>
        )}

        {username && (
          <div className="user-badge">

            <FaUserCircle className="user-icon" />

            <span className="user-name">
              {username}
            </span>

            <span className={`user-role ${role === "ADMIN" ? "admin" : ""}`}>
              {role}
            </span>

          </div>
        )}

        {username && (
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <FaSignOutAlt />
          </button>
        )}

      </div>

    </div>

  );
}

export default Header;