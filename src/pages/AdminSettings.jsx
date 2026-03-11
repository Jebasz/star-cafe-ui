import { useEffect, useState } from "react";
import { getShop } from "../services/shopService";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCog } from "react-icons/fa";

import CustomModal from "../components/common/CustomModal";
import FilterTypeConfig from "../components/admin/FilterTypeConfig";

import "../styles/admin/AdminSettings.css";

function AdminSettings() {

  const navigate = useNavigate();
  const shopId = 1;

  const [themeMode, setThemeMode] = useState("DARK");

  const [modal, setModal] = useState({
    show: false,
    type: "",
    title: "",
    message: ""
  });

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {

    try {

      const response = await getShop(shopId);

      const shop = response.data;

      const savedTheme =
        shop.themeMode ||
        localStorage.getItem("themeMode") ||
        "DARK";

      setThemeMode(savedTheme);

      applyTheme(savedTheme);

    } catch (error) {

      console.error("Shop load error:", error);

    }

  };

  const saveTheme = () => {

    localStorage.setItem("themeMode", themeMode);

    applyTheme(themeMode);

    setModal({
      show: true,
      type: "success",
      title: "Theme Updated",
      message: "Theme applied successfully"
    });

  };

  const applyTheme = (mode) => {

    const link = document.getElementById("theme-style");

    if (!link) return;

    if (mode === "LIGHT") {

      link.href = "/themes/theme-light.css";

    } else {

      link.href = "/themes/theme-dark.css";

    }

  };

  return (

    <div className="settings-page">

      <div className="settings-card">

        {/* BACK BUTTON */}

        <button
          className="settings-back"
          onClick={() => navigate("/admin")}
        >
          <FaArrowLeft /> Back
        </button>

        {/* HEADER */}

        <div className="settings-header">
          <FaCog />
          <h4>Billing Configuration</h4>
        </div>

        {/* FILTER CONFIG COMPONENT */}

        <div className="settings-section">

        <label>Product Filter Type</label>

             <FilterTypeConfig />

        </div>

        {/* THEME CONFIG */}

        <div className="settings-section">

          <label>Theme Mode</label>

          <select
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value)}
          >

            <option value="DARK">
              Dark Theme
            </option>

            <option value="LIGHT">
              Light Theme
            </option>

          </select>

          <button
            className="settings-btn"
            onClick={saveTheme}
          >
            Apply Theme
          </button>

        </div>

      </div>

      {/* MODAL */}

      <CustomModal
        show={modal.show}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() =>
          setModal({ ...modal, show: false })
        }
      />

    </div>

  );

}

export default AdminSettings;