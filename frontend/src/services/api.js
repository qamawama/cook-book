import axios from "axios";

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer  ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const register = (userData) => {
    return api.post('/auth/register', userData);
};

export const login = (credentials) => {
    return api.post('/auth/login', credentials);
};

export const getAllRecipes = () => {
    return api.get('/recipes');
};

export const getRecipeById = (id) => {
    return api.get(`/recipes/${id}`);
};

export const getMyRecipes = () => {
    return api.get('/recipes/my-recipes');
};

export const createRecipe = (recipeData) => {
    return api.post('/recipes/create', recipeData);
};

export default api;