import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toggleFavourite, getAllProductsForBilling  } from "../../services/productService";

import { FaPlus, FaCoffee } from "react-icons/fa";

import "../../styles/billing/product-panel.css";

function ProductPanel({
    shopId,
    category,
    price,
    subProduct,
    filterType,
    onProductSelect
}) {

    const [products, setProducts] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllProducts = async () => {

        const cacheKey = `allProducts_${shopId}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        const response = await getAllProductsForBilling(shopId);

        localStorage.setItem(
            cacheKey,
            JSON.stringify(response.data)
        );

        return response.data;
    };

    useEffect(() => {

        if (!category) {
            setProducts([]);
            return;
        }

        loadProducts();

    }, [shopId, category, price, subProduct, filterType]);

    const loadProducts = async () => {

    try {

        setLoading(true);

        const allProducts = await getAllProducts();

        let filtered = [...allProducts];

        if (category?.id === "favourites") {

            const fav = filtered.filter(p => p.favourite);
            setFavourites(fav);
            return;

        }

        if (category?.id === "search") {

            const keyword =
                category.keyword?.toLowerCase() || "";

            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(keyword)
            );

            setProducts(filtered);
            return;

        }

        filtered = filtered.filter(p =>
            Number(p.categoryId) === Number(category.id)
        );

        if (filterType === "SUB_PRODUCT" && subProduct) {

            filtered = filtered.filter(p =>
                Number(p.subProductId) === Number(subProduct.id)
            );

        }

        if (filterType === "PRICE" && price) {

            filtered = filtered.filter(p =>
                p.price >= price.minPrice &&
                p.price <= price.maxPrice
            );

        }

        setProducts(filtered);

    } catch (error) {

        console.error("Product Load Error:", error);

    } finally {

        setLoading(false);

    }

};

    const handleToggleFavourite = async (e, productId) => {

        e.stopPropagation();

        await toggleFavourite(productId);

        const cacheKey = `allProducts_${shopId}`;
        const cached = JSON.parse(localStorage.getItem(cacheKey)) || [];

        const updated = cached.map(p =>
            p.id === productId
                ? { ...p, favourite: !p.favourite }
                : p
        );

        localStorage.setItem(
            cacheKey,
            JSON.stringify(updated)
        );

        loadProducts();

    };

    const renderCard = (product) => (

        <div
            key={product.id}
            className="col-6 col-sm-4 col-md-3 col-lg-2"
        >

            <div
                className="product-card"
                onClick={() => onProductSelect(product)}
            >

                <img
                    src={product.imageUrl || "https://via.placeholder.com/300"}
                    alt={product.name}
                    loading="lazy"
                    className="product-image"
                />

                <div className="product-overlay" />

                <div className="product-name">
                    {product.name}
                </div>

                <div className="product-price">
                    ₹{product.price}
                </div>

                <div className="product-add">
                    <FaPlus size={9} />
                </div>

                <div
                    className={`product-fav ${product.favourite ? "active" : ""}`}
                    onClick={(e) => handleToggleFavourite(e, product.id)}
                >
                    <FaCoffee size={9} />
                </div>

            </div>

        </div>

    );

    return (

        <div className="product-panel">

            {loading && (
                <div className="product-message">
                    Loading products...
                </div>
            )}

            {!loading && !category && (
                <div className="product-message">
                    Select a category
                </div>
            )}

            <div className="row g-3">
                {category?.id === "favourites"
                    ? favourites.map(renderCard)
                    : products.map(renderCard)}
            </div>

        </div>

    );

}

export default ProductPanel;