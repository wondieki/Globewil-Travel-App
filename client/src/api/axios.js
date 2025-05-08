import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // for sending cookies if JWT/session is used
});

export default api;
