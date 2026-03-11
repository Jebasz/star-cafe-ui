import API from "./api";

export const getDailyReport = (shopId, date) => {

    return API.get("/reports/daily", {
        params: {
            shopId,
            date
        }
    });

};

export const getMonthlyReport = (shopId, year, month) => {

    return API.get("/reports/monthly", {
        params: {
            shopId,
            year,
            month
        }
    });

};

export const getYearlyReport = (shopId, year) => {

    return API.get("/reports/yearly", {
        params: {
            shopId,
            year
        }
    });

};

export const getCustomReport = (shopId, fromDate, toDate) => {

    return API.get("/reports/custom", {
        params: {
            shopId,
            fromDate,
            toDate
        }
    });

};