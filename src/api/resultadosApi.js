// src/api/resultadosApi.js (CONFIGURACIÓN CORREGIDA)
import axios from 'axios';

// 🚨 1. BASE_URL_MOCKAPI debe ser la URL de la RAÍZ (ej: .../api)
const BASE_URL_MOCKAPI = 'https://68d6a769c2a1754b426b7d94.mockapi.io/api'; 

const resultadosApi = axios.create({
  // 🚨 2. baseURL debe ser la BASE_URL_MOCKAPI (sin agregar el recurso)
  baseURL: BASE_URL_MOCKAPI, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default resultadosApi;