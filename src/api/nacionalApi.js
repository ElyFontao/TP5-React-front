// src/api/nacionalApi.js
import axios from 'axios';

// 🚨 Apunta al puerto donde corre tu servidor Express
const BASE_URL_PROXY = 'http://localhost:3001';

const nacionalApi = axios.create({
  baseURL: BASE_URL_PROXY,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
});

/**
 * 🔁 Consulta del resumen nacional (Catamarca totalizado por secciones)
 * Devuelve datos de la API nacional a través del backend proxy
 */
export const getResumenCatamarcaReal = async () => {
  const filtros = {
    anioEleccion: 2023,
    tipoRecuento: 1,
    tipoEleccion: 2,
    categoriaId: 3,
    distritoId: 3,
    seccionProvincialId: 0,
    seccionId: 0 // ✅ activa la totalización por secciones
  };

  try {
    const res = await nacionalApi.get('/api/nacional', { params: filtros });
    return res.data.estadoRecuento;
  } catch (error) {
    console.error('❌ Error al consultar resumen real:', error.message);
    throw error;
  }
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

/**
 * 📊 Comparación entre elecciones 2023 (API nacional) y 2025 (MockAPI)
 * Requiere mesaId, circuitoId y seccionId
 */
export const compararMesaEntreElecciones = async ({ mesaId, circuitoId, seccionId }) => {
  const params = { mesaId, circuitoId, seccionId };

  try {
    const res = await nacionalApi.get('/api/comparar/mesa', { params });
    return res.data;
  } catch (error) {
    console.error('❌ Error al comparar mesa entre elecciones:', error.message);
    throw error;
  }
};

export default nacionalApi;
