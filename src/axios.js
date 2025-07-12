import axios from 'axios';

const API = axios.create({
  baseURL: 'https://task-master-sooty.vercel.app/',
  withCredentials: true,
});

export default API;