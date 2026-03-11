import API from "./api";

export const getPriceFilters = (shopId) => {

    return API.get(`/price-filters/shop/${shopId}`);

};