import React, { useState, useEffect, useRef } from "react";
import API from "../services/api";
import CustomModal from "../components/common/CustomModal";
import {
  FaBoxOpen,
  FaRupeeSign,
  FaSave,
  FaTag,
  FaImage
} from "react-icons/fa";
import "../styles/admin/ProductManagement.css";

function ProductManagement() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [subProducts, setSubProducts] = useState([]);
  const [subProductId, setSubProductId] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const priceRef = useRef(null);

  const [modal, setModal] = useState({
    show: false,
    type: "",
    title: "",
    message: ""
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const handleCategoryChange = async (e) => {

    const value = e.target.value;
    setCategoryId(value);
    setSubProductId("");

    if (!value) {
      setSubProducts([]);
      return;
    }

    const res = await API.get("/sub-products", {
      params: { shopId: 1, categoryId: value }
    });

    setSubProducts(res.data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const createProduct = async () => {

    if (!name || !price || !categoryId || !subProductId || !image) {
      setModal({
        show: true,
        type: "warning",
        title: "Missing Fields",
        message: "Please fill all fields before saving."
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("subProductId", subProductId);
    formData.append("shopId", 1);
    formData.append("image", image);

    try {

      setLoading(true);

      await API.post("/products/with-image", formData);

      setModal({
        show: true,
        type: "success",
        title: "Product Added",
        message: "Product added successfully 🎉"
      });

      setName("");
      setPrice("");
      setCategoryId("");
      setSubProductId("");
      setSubProducts([]);
      setImage(null);
      setPreview(null);

    } catch {
      setModal({
        show: true,
        type: "error",
        title: "Failed",
        message: "Unable to save product."
      });
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="pm-page">

      <div className="pm-card">

        <div className="pm-header">
          <FaBoxOpen />
          <div>
            <h4>Product Management</h4>
            <small>Add new items to menu</small>
          </div>
        </div>

        <div className="pm-grid">

          <div className="pm-field">
            <FaTag />
            <input
              placeholder="Product name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && priceRef.current.focus()}
            />
          </div>

          <div className="pm-field">
            <FaRupeeSign />
            <input
              ref={priceRef}
              type="number"
              placeholder="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <select value={categoryId} onChange={handleCategoryChange}>
            <option value="">Category</option>
            {categories.map(c =>
              <option key={c.id} value={c.id}>{c.name}</option>
            )}
          </select>

          <select
            value={subProductId}
            onChange={e => setSubProductId(e.target.value)}
            disabled={!subProducts.length}
          >
            <option value="">Sub Product</option>
            {subProducts.map(s =>
              <option key={s.id} value={s.id}>{s.name}</option>
            )}
          </select>

          <label className="pm-image">
            <FaImage />
            <span>Upload Image</span>
            <input type="file" hidden accept="image/*" onChange={handleImageChange}/>
          </label>

          {preview && (
            <img className="pm-preview" src={preview} alt="preview"/>
          )}

        </div>

        <button className="pm-save" onClick={createProduct} disabled={loading}>
          <FaSave /> {loading ? "Saving..." : "Save Product"}
        </button>

      </div>

      <CustomModal {...modal} onClose={() => setModal({...modal, show:false})}/>

    </div>
  );
}

export default ProductManagement;