import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/',
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
        let message =
            error.response?.data?.message ||
            error.response?.data?.errors?.[0]?.message ||
            error.message ||
            'Something went wrong';

        // Append debug info if available (helpful for diagnosing Vercel 500s)
        if (error.response?.data?.debug) {
            const { name, message: debugMsg } = error.response.data.debug;
            message += ` (${name}: ${debugMsg})`;
        }

        return Promise.reject({ ...error, userMessage: message });
    }
);

export default api;
