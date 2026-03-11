import API from "./api";

export const getSubProducts = (shopId, categoryId) => {

    return API.get("/sub-products", {
        params: {
            shopId,
            categoryId
        }
    });

};