








//import axios from 'axios';

//const api = axios.create({
//  baseURL: 'http://localhost:4000/api' // apunta al backend en puerto 4000
//});

//export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL // ahora toma la URL del backend en Render
});

export default api;
