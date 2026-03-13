import React, { useEffect, useState } from "react";
import { getSubProducts } from "../../services/subProductService";
import "../../styles/billing/subproduct-panel.css";

function SubProductPanel({
    shopId,
    category,
    selectedSubProduct,
    onSubProductSelect,
    resetSignal
}) {

    const [subProducts, setSubProducts] = useState([]);

    useEffect(() => {

        if (!category) {
            setSubProducts([]);
            return;
        }

        loadSubProducts();

    }, [category]);

    /* RESET HANDLER */
    useEffect(() => {
        // parent controls selection so nothing to clear
        // but ensures UI refresh when reset happens
    }, [resetSignal]);

    const loadSubProducts = async () => {

        const cacheKey = `subProducts_${shopId}_${category.id}`;
        const cachedSubProducts = localStorage.getItem(cacheKey);

        if (cachedSubProducts) {
            setSubProducts(JSON.parse(cachedSubProducts));
            return;
        }

        try {

            const response = await getSubProducts(
                shopId,
                category.id
            );

            setSubProducts(response.data);

            localStorage.setItem(
                cacheKey,
                JSON.stringify(response.data)
            );

        } catch (error) {

            console.error("SubProduct Load Error:", error);

        }

    };

    return (

        <div className="subproduct-panel">

            <div className="subproduct-buttons">

                {subProducts.map(sub => {

                    const isSelected =
                        selectedSubProduct?.id === sub.id;

                    return (

                        <button
                            key={sub.id}
                            onClick={() => onSubProductSelect(sub)}
                            className={`subproduct-btn ${isSelected ? "active" : ""}`}
                        >
                            {sub.name}
                        </button>

                    );

                })}

            </div>

        </div>

    );
}

export default SubProductPanel;