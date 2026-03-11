import API from "./api";

export const getShop = (shopId) => {

    return API.get(`/shops/${shopId}`);

};

export const updateFilterType = (shopId, filterType) => {

    return API.patch(`/shops/${shopId}/filter-type`, null, {
        params: { filterType }
    });

};