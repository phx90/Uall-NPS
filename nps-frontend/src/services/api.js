import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5087/api',
});

export default api;
