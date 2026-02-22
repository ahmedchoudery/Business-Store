import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.response?.data?.errors?.[0]?.message ||
            error.message ||
            'Something went wrong';
        return Promise.reject({ ...error, userMessage: message });
    }
);

export default api;
