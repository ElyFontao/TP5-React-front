// src/context/ResultadosContext.jsx (Versión Correcta para el CRUD Electoral)
import { createContext, useState, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import resultadosApi from '../api/resultadosApi'; // Importa la instancia de Axios

// 1. Crear el Contexto
const ResultadosContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useResultados = () => useContext(ResultadosContext);

// 2. Crear el Proveedor del Contexto
export const ResultadosProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // --- LÓGICA DE FETCH (READ) ---
  const obtenerResultados = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const response = await resultadosApi.get('/resultados');
      setResultados(response.data);
    } catch (err) {
      console.error("Error al obtener resultados:", err);
      setError("No se pudieron cargar los resultados.");
      toast.error("Error al cargar los datos. Verifique su API.");
    } finally {
      setCargando(false);
    }
  }, []);

  // --- LÓGICA DE CREAR (CREATE) ---
  const crearResultado = async (nuevoDato) => {
    try {
      setCargando(true);
      const response = await resultadosApi.post('/resultados', nuevoDato);
      setResultados(prev => [...prev, response.data]); 
      toast.success('¡Resultado creado con éxito!');
      return response.data;
    } catch (err) {
      console.error("Error al crear resultado:", err);
      toast.error('Error al crear el resultado.');
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // --- LÓGICA DE ACTUALIZAR (UPDATE) ---
  const actualizarResultado = async (id, datosActualizados) => {
    try {
      setCargando(true);
      const response = await resultadosApi.put(`/${id}`, datosActualizados);
      setResultados(prev => prev.map(resultado => 
        resultado.id === id ? response.data : resultado
      ));
      toast.success('¡Resultado actualizado correctamente!');
      return response.data;
    } catch (err) {
      console.error("Error al actualizar resultado:", err);
      toast.error('Error al actualizar el resultado.');
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // --- LÓGICA DE ELIMINAR (DELETE) ---
  const eliminarResultado = async (id) => {
    try {
      setCargando(true);
      await resultadosApi.delete(`/${id}`);
      setResultados(prev => prev.filter(resultado => resultado.id !== id));
      toast.info('Resultado eliminado.');
    } catch (err) {
      console.error("Error al eliminar resultado:", err);
      toast.error('Error al intentar eliminar el resultado.');
    } finally {
      setCargando(false);
    }
  };
  
  // 3. Objeto de Valor a Proveer
  const contextValue = {
    resultados,
    cargando,
    error,
    obtenerResultados,
    crearResultado,
    actualizarResultado,
    eliminarResultado,
  };

  return (
    <ResultadosContext.Provider value={contextValue}>
      {children}
    </ResultadosContext.Provider>
  );
};