import axios from "axios";

const API = axios.create({

    baseURL: "https://cafe-billing-backend-a5i8.onrender.com/",

});


// Add JWT automatically
API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

export default API;