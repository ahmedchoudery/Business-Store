import axios from 'axios';

/**
 * Shared Axios instance — all API calls in the app should use this.
 * baseURL falls back to '/api' so relative paths work on both local dev
 * (via Vite proxy) and on Vercel (via vercel.json rewrites).
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Placeholder for future auth token injection (e.g. Authorization header).
api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Build a user-friendly message from the server's response
        const userMessage =
            error.response?.data?.message ||
            error.response?.data?.errors?.[0]?.message ||
            error.message ||
            'Something went wrong';

        // FIX: Instead of spreading the Error/AxiosError (which loses the prototype
        // chain and stack trace), attach userMessage as a property on the
        // original error object so instanceof checks and stack traces still work.
        error.userMessage = userMessage;

        return Promise.reject(error);
    }
);

export default api;
