import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor to dynamically set Authorization header with JWT token from localStorage
api.interceptors.request.use(config => {
    const jwt = localStorage.getItem("persist");
    console.log(jwt);
    if (jwt) {
        const token = JSON.parse(jwt).auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});
