import API from "./api";

export const getProducts = (
    shopId,
    categoryId,
    minPrice,
    maxPrice
) => {

    return API.get("/products", {
        params: {
            shopId,
            categoryId,
            minPrice,
            maxPrice
        }
    });

};

export const getFavouriteProducts = (shopId) => {
    return API.get("/products/favourites", {
        params: { shopId }
    });
};

export const toggleFavourite = (productId) => {
    return API.patch(`/products/${productId}/favourite`);
};

/* 🔍 SEARCH PRODUCTS */
export const searchProducts = (shopId, keyword) => {
    return API.get("/products/search", {
        params: {
            shopId,
            keyword
        }
    });
};

export const getProductsBySubProduct = (shopId, subProductId) => {

    return API.get("/products/sub-product", {
        params: {
            shopId,
            subProductId
        }
    });

};

export const getAllProductsForBilling = (shopId) => {
    return API.get(`/products/shop/${shopId}/billing`);
};