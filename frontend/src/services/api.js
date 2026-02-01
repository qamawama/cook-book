import axios from "axios";

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
});


export const register = (userData) => {
    return api.post('auth/register', userData);
};

export default api;