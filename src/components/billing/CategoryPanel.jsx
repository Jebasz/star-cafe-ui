import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

import {
    FaSnowflake,
    FaMugHot,
    FaCookieBite,
    FaBoxOpen,
    FaCoffee,
    FaSearch
} from "react-icons/fa";

import "../../styles/billing/category-panel.css";

function CategoryPanel({ onCategorySelect, resetSignal }) {

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    /* RESET HANDLER */
   useEffect(() => {
    setSearchKeyword("");
}, [resetSignal]);

    const loadCategories = async () => {

        const cachedCategories = localStorage.getItem("categories");

        if (cachedCategories) {
            setCategories(JSON.parse(cachedCategories));
            return;
        }

        const response = await getCategories();
        setCategories(response.data);

        localStorage.setItem(
            "categories",
            JSON.stringify(response.data)
        );
    };

    const getCategoryIcon = (name) => {

        const normalized = name?.toLowerCase() || "";

        if (normalized.includes("cold")) return <FaSnowflake />;
        if (normalized.includes("hot")) return <FaMugHot />;
        if (normalized.includes("snack")) return <FaCookieBite />;

        return <FaBoxOpen />;
    };

    const renderButton = (id, label, icon, categoryObj = null) => {

        const isSelected = selectedCategoryId === id;

        return (
            <button
                key={id}
                className={`category-btn ${isSelected ? "active" : ""}`}
                onClick={() => {
                    setSelectedCategoryId(id);
                    setSearchKeyword("");
                    onCategorySelect(categoryObj);
                }}
            >
                <span className="category-icon">
                    {icon}
                </span>

                <span>{label}</span>
            </button>
        );
    };

    /* CATEGORY ORDERING (UI ONLY) */
    const orderedCategories = [...categories].sort((a, b) => {

        const order = ["hot", "cold", "snack"];

        const getOrder = (name) => {
            const index = order.findIndex(o =>
                name?.toLowerCase().includes(o)
            );
            return index === -1 ? 99 : index;
        };

        return getOrder(a.name) - getOrder(b.name);
    });

    return (
        <div className="category-panel">

            {/* SEARCH */}
            <div className="category-search">

                <div className="search-label">
                    <FaSearch />
                    <span>Search Product</span>
                </div>

                <input
                    type="text"
                    placeholder="Search coffee..."
                    value={searchKeyword}
                    onChange={(e) => {

                        const value = e.target.value;

                        setSearchKeyword(value);
                        setSelectedCategoryId("search");

                        onCategorySelect({
                            id: "search",
                            keyword: value
                        });

                    }}
                    className="search-input"
                />

            </div>

            {/* FAVOURITES */}
            {renderButton(
                "favourites",
                "Favourites",
                <FaCoffee />,
                { id: "favourites", name: "Favourites" }
            )}

            {/* NORMAL CATEGORIES */}
            {orderedCategories.map(category =>
                renderButton(
                    category.id,
                    category.name,
                    getCategoryIcon(category.name),
                    category
                )
            )}

        </div>
    );
}

export default CategoryPanel;