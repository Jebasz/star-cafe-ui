import { Link, Outlet, useLocation } from "react-router-dom";
import { FaChartBar, FaBoxOpen, FaCog, FaTrash } from "react-icons/fa";
import logo from "../assets/Logo.png";

import "../styles/layout/AdminLayout.css";

function AdminLayout() {

  const location = useLocation();

  const active = (path) =>
    location.pathname === path ? "admin-link active" : "admin-link";

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}

      <div className="admin-sidebar">

        <div className="admin-logo">

          <img
            src={logo}
            alt="Star Tea Park"
          />

          <h5>
            STAR Tea Park
          </h5>

          <small>
            Admin Panel
          </small>

        </div>

        <div className="admin-nav">

          <Link
            to="/admin"
            className={active("/admin")}
          >
            <FaChartBar />
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={active("/admin/products")}
          >
            <FaBoxOpen />
            Products
          </Link>

          <Link
            to="/admin/settings"
            className={active("/admin/settings")}
          >
            <FaCog />
            Settings
          </Link>

          <Link
            to="/admin/delete-products"
            className={active("/admin/delete-products")}
          >
            <FaTrash />
            Delete Products
          </Link>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="admin-main">
        <Outlet />
      </div>

    </div>

  );

}

export default AdminLayout;