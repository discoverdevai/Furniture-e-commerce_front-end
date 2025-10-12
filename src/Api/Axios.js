import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // change this to your backend base URL
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // read token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response Interceptor for handling 401 or refresh token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized — maybe token expired");
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
