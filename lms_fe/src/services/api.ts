import axios from 'axios';

declare global {
  interface Window {
    _env_?: {
      API_URL?: string;
    };
  }
}


const API_BASE_URL: string =
  window._env_?.API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors để xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
