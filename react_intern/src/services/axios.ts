import axios from "axios";
import { getCurrentToken, refreshToken } from "./authService";

const instance = axios.create({
  baseURL: "https://68005c4ab72e9cfaf72754ed.mockapi.io",
  timeout: 10000,
});

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = await getCurrentToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const newToken = await refreshToken();
        if (newToken) {
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        // Redirect to login if token refresh fails
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
