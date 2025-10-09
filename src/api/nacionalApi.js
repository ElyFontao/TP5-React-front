// src/api/nacionalApi.js (NUEVO ARCHIVO)
import axios from 'axios';

// 🚨 Apunta al puerto donde corre tu servidor Express
const BASE_URL_PROXY = 'http://localhost:3001'; 

const nacionalApi = axios.create({
  baseURL: BASE_URL_PROXY, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default nacionalApi;