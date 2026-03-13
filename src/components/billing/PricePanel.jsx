import React, { useEffect, useState } from "react";
import { getPriceFilters } from "../../services/priceFilterService";
import "../../styles/billing/price-panel.css";

function PricePanel({
    shopId,
    selectedPrice,
    onPriceSelect,
    resetSignal
}) {

    const [prices, setPrices] = useState([]);

    useEffect(() => {
        if (shopId) {
            loadPrices();
        }
    }, [shopId]);

    /* RESET HANDLER */
    useEffect(() => {
        // nothing to clear because selection comes from parent
        // but this forces re-render when reset happens
    }, [resetSignal]);

    const loadPrices = async () => {

        const cacheKey = `priceFilters_${shopId}`;
        const cachedPrices = localStorage.getItem(cacheKey);

        if (cachedPrices) {
            setPrices(JSON.parse(cachedPrices));
            return;
        }

        const response = await getPriceFilters(shopId);
        setPrices(response.data);

        localStorage.setItem(
            cacheKey,
            JSON.stringify(response.data)
        );
    };

    return (

        <div className="price-panel">

            <div className="price-buttons">

                {prices.map(price => {

                    const isSelected =
                        selectedPrice?.id === price.id;

                    const label =
                        price.maxPrice === 99999
                            ? `₹${price.minPrice}+`
                            : `₹${price.minPrice}-${price.maxPrice}`;

                    return (

                        <button
                            key={price.id}
                            onClick={() => onPriceSelect(price)}
                            className={`price-btn ${isSelected ? "active" : ""}`}
                        >
                            {label}
                        </button>

                    );
                })}

            </div>

        </div>

    );
}

export default PricePanel;