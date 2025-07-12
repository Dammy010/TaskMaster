import axios from 'axios';

const API = axios.create({
  baseURL: 'https://task-master-backend-nu.vercel.app',
  withCredentials: true,
});

export default API;