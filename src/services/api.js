import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;
const BASE_URL = `${apiURL}`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
