import React, { useEffect, useState } from "react";
import { getSubProducts } from "../../services/subProductService";
import "../../styles/billing/subproduct-panel.css";

function SubProductPanel({
    shopId,
    category,
    selectedSubProduct,
    onSubProductSelect
}) {

    const [subProducts, setSubProducts] = useState([]);

    useEffect(() => {

        if (!category) {
            setSubProducts([]);
            return;
        }

        loadSubProducts();

    }, [category]);

    const loadSubProducts = async () => {

        try {

            const response = await getSubProducts(
                shopId,
                category.id
            );

            setSubProducts(response.data);

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