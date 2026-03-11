import API from "./api";

export const createBill = (billData) => {

    return API.post("/bills", billData);

};