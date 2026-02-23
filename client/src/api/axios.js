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

        // Append debug info if available (helpful for diagnosing Vercel 500s/404s)
        if (error.response?.data?.diagnostics) {
            const diag = error.response.data.diagnostics;
            message += ` [Diag: ${diag.method} ${diag.originalUrl || diag.url}]`;
        } else if (error.response?.data?.debug) {
            const { name, message: debugMsg } = error.response.data.debug;
            message += ` (${name}: ${debugMsg})`;
        } else if (error.config?.url) {
            // If no server-side debug info, at least show where we tried to go
            message += ` [Target: ${error.config.url}]`;
        }

        return Promise.reject({ ...error, userMessage: message });
    }
);

export default api;
