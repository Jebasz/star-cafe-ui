import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaPrint
} from "react-icons/fa";

import "../../styles/common/custom-modal.css";

function CustomModal({ show, type, title, message, onClose, onPrint, loading }) {

  if (!show) return null;

  const icon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="modal-icon success" />;
      case "error":
        return <FaTimesCircle className="modal-icon error" />;
      case "warning":
        return <FaExclamationTriangle className="modal-icon warning" />;
      default:
        return null;
    }
  };

  return (

    <div className="modal-overlay">

      <div className="modal-container">

        <div className="modal-icon-wrapper">
          {icon()}
        </div>

        <h5 className="modal-title">
          {title}
        </h5>

        <p className="modal-message">
          {message}
        </p>

        {onPrint && (
          <button
            onClick={onPrint}
            className="modal-print-btn"
            disabled={loading}
          >
            <FaPrint className="me-2" />
            {loading ? "Printing..." : "Print Bill"}
          </button>
        )}

        <button
          onClick={onClose}
          className="modal-ok-btn"
        >
          Cancel
        </button>

      </div>

    </div>

  );
}

export default CustomModal;