import React, { useState, useEffect } from "react";
import API from "../../services/api";
import CustomModal from "../../components/common/CustomModal";
import { FaTrash, FaBoxOpen, FaCheck } from "react-icons/fa";

import "../../styles/admin/DeleteProduct.css";

function DeleteProduct() {

  const [products, setProducts] = useState([]);
  const [confirm, setConfirm] = useState({
    show: false,
    product: null,
    action: ""
  });

  const [modal, setModal] = useState({
    show: false,
    type: "",
    title: "",
    message: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const res = await API.get("/products/shop/1/all");

      setProducts(res.data);

    } catch {

      setModal({
        show: true,
        type: "error",
        title: "Error",
        message: "Failed to load products."
      });

    }

  };

  const openConfirm = (product, action) => {
    setConfirm({
      show: true,
      product,
      action
    });
  };

  const closeConfirm = () => {
    setConfirm({
      show: false,
      product: null,
      action: ""
    });
  };

  const disableProduct = async (product) => {

    try {

      await API.delete(`/products/${product.id}`);

      setProducts(products.map(p =>
        p.id === product.id ? { ...p, active: false } : p
      ));

    } catch {

      setModal({
        show: true,
        type: "error",
        title: "Failed",
        message: "Unable to disable product."
      });

    }

  };

  const enableProduct = async (product) => {

    try {

      await API.patch(`/products/${product.id}/enable`);

      setProducts(products.map(p =>
        p.id === product.id ? { ...p, active: true } : p
      ));

    } catch {

      setModal({
        show: true,
        type: "error",
        title: "Failed",
        message: "Unable to enable product."
      });

    }

  };

  const confirmAction = () => {

    if (confirm.action === "disable") {
      disableProduct(confirm.product);
    } else {
      enableProduct(confirm.product);
    }

    closeConfirm();
  };

  return (

    <div className="dp-page">

      <div className="dp-header">
        <FaBoxOpen />
        <div>
          <h3>Product Status</h3>
          <small>Enable or disable products</small>
        </div>
      </div>

      <div className="dp-grid">

        {products.map(product => (

          <div
            key={product.id}
            className={`dp-card ${!product.active ? "dp-disabled" : ""}`}
          >

            <div className="dp-image">

              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name}/>
              ) : (
                <div className="dp-no-image">
                  No Image
                </div>
              )}

            </div>

            <div className="dp-info">

              <h4>{product.name}</h4>

              <span className="dp-price">
                ₹{product.price}
              </span>

              {!product.active && (
                <span className="dp-badge">
                  Disabled
                </span>
              )}

            </div>

            <div className="dp-actions">

              {product.active ? (

                <button
                  className="dp-disable-btn"
                  onClick={() => openConfirm(product, "disable")}
                >
                  <FaTrash/>
                  Disable
                </button>

              ) : (

                <button
                  className="dp-enable-btn"
                  onClick={() => openConfirm(product, "enable")}
                >
                  <FaCheck/>
                  Enable
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

      {!products.length && (
        <div className="dp-empty">
          No products available
        </div>
      )}

      {confirm.show && (

        <div className="dp-confirm-overlay">

          <div className="dp-confirm-box">

            <h4>
              {confirm.action === "disable"
                ? "Disable Product"
                : "Enable Product"}
            </h4>

            <p>
              Are you sure you want to
              {" "}
              {confirm.action}
              {" "}
              <strong>{confirm.product?.name}</strong> ?
            </p>

            <div className="dp-confirm-actions">

              <button
                className="dp-cancel"
                onClick={closeConfirm}
              >
                Cancel
              </button>

              <button
                className="dp-confirm"
                onClick={confirmAction}
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

      <CustomModal
        {...modal}
        onClose={() => setModal({ ...modal, show: false })}
      />

    </div>

  );

}

export default DeleteProduct;