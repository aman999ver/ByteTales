import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
=======
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4007',
>>>>>>> 2935e4d18f247f9f859bef186661ce872c7f7fef
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
