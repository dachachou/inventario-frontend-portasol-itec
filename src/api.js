








import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api' // apunta al backend en puerto 4000
});

export default api;