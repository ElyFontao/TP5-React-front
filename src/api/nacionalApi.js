// src/api/nacionalApi.js
import axios from 'axios';

// 🚨 Apunta al puerto donde corre tu servidor Express
const BASE_URL_PROXY = 'http://localhost:3001';

const nacionalApi = axios.create({
  baseURL: BASE_URL_PROXY,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 🔁 Consulta del resumen nacional
 * Devuelve datos de APi Nacional 
 */
export const getResumenCatamarcaReal = async () => {
  const filtros = {
    anioEleccion: 2023,
    tipoRecuento: 1,
    tipoEleccion: 2,
    categoriaId: 3,
    distritoId: 3,
    seccionProvincialId: 0,
    seccionId: 0 // ✅ esto activa la totalización por secciones
  };

  const response = await fetch(`${BASE_URL_PROXY}/api/nacional?` + new URLSearchParams(filtros), {
    method: 'GET',
    headers: { 'Cache-Control': 'no-cache' }
  });

  if (!response.ok) throw new Error('Error al consultar resumen real');

  const data = await response.json();
  return data.estadoRecuento;
};


/**
 * 🧠 Consulta real por mesa (proxy hacia API nacional)
 * Requiere todos los parámetros obligatorios
 */
export const getResultadosPorMesaReal = async (params) => {
  try {
    const res = await nacionalApi.get('/api/nacional/mesa', { params });
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener resultados reales por mesa:', error.message);
    throw error;
  }
};

export const compararMesaEntreElecciones = async ({ mesaId, circuitoId, seccionId }) => {
  const params = { mesaId, circuitoId, seccionId };
  const response = await fetch(`${BASE_URL_PROXY}/api/comparar/mesa?` + new URLSearchParams(params));
  if (!response.ok) throw new Error('Error al comparar mesa');
  return await response.json();
};

export default nacionalApi;

