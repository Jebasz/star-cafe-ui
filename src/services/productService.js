import React, { useEffect, useState } from "react";
import {
    getProducts,
    getFavouriteProducts,
    toggleFavourite,
    searchProducts,
    getProductsBySubProduct
} from "../../services/productService";

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

    const getCacheKey = () =>
        `productCache_${shopId}_${category?.id}_${price?.minPrice}_${price?.maxPrice}_${subProduct?.id}_${category?.keyword}`;

    useEffect(() => {

        if (!category) {
            setProducts([]);
            return;
        }

        if (category.id === "favourites") {
            loadFavourites();
            return;
        }

        if (category.id === "search") {
            loadSearchProducts();
            return;
        }

        if (filterType === "SUB_PRODUCT") {

            if (subProduct) {
                loadSubProductProducts();
            } else {
                setProducts([]);
            }

            return;
        }

        if (filterType === "PRICE") {

            if (price) {
                loadProducts();
            } else {
                setProducts([]);
            }

        }

    }, [shopId, category, price, subProduct, filterType]);

    const loadProducts = async () => {

        const cacheKey = getCacheKey();
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            setProducts(JSON.parse(cached));
            return;
        }

        try {

            setLoading(true);

            const response = await getProducts(
                shopId,
                category.id,
                price.minPrice,
                price.maxPrice
            );

            setProducts(response.data);

            localStorage.setItem(
                cacheKey,
                JSON.stringify(response.data)
            );

        } catch (error) {

            console.error("Product Load Error:", error);

        } finally {

            setLoading(false);

        }

    };

    const loadSubProductProducts = async () => {

        const cacheKey = getCacheKey();
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            setProducts(JSON.parse(cached));
            return;
        }

        try {

            setLoading(true);

            const response = await getProductsBySubProduct(
                shopId,
                subProduct.id
            );

            setProducts(response.data);

            localStorage.setItem(
                cacheKey,
                JSON.stringify(response.data)
            );

        } catch (error) {

            console.error("SubProduct Load Error:", error);

        } finally {

            setLoading(false);

        }

    };

    const loadSearchProducts = async () => {

        if (!category?.keyword || category.keyword.trim() === "") {
            setProducts([]);
            return;
        }

        const cacheKey = getCacheKey();
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            setProducts(JSON.parse(cached));
            return;
        }

        try {

            setLoading(true);

            const response = await searchProducts(
                shopId,
                category.keyword
            );

            setProducts(response.data);

            localStorage.setItem(
                cacheKey,
                JSON.stringify(response.data)
            );

        } catch (error) {

            console.error("Search Error:", error);

        } finally {

            setLoading(false);

        }

    };

    const loadFavourites = async () => {

        const cacheKey = `favourites_${shopId}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            setFavourites(JSON.parse(cached));
            return;
        }

        try {

            setLoading(true);

            const response = await getFavouriteProducts(shopId);

            setFavourites(response.data);

            localStorage.setItem(
                cacheKey,
                JSON.stringify(response.data)
            );

        } catch (error) {

            console.error("Favourite Load Error:", error);

        } finally {

            setLoading(false);

        }

    };

    const handleToggleFavourite = async (e, productId) => {

        e.stopPropagation();

        await toggleFavourite(productId);

        localStorage.clear();

        if (category?.id === "favourites") {
            loadFavourites();
        } else if (category?.id === "search") {
            loadSearchProducts();
        } else if (filterType === "SUB_PRODUCT") {
            loadSubProductProducts();
        } else {
            loadProducts();
        }

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