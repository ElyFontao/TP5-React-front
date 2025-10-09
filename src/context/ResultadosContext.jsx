// src/context/ResultadosContext.jsx

import React, { createContext, useContext, useState, useCallback } from 'react';
import resultadosApi from '../api/resultadosApi'; // Cliente de Axios configurado

const RECURSO_URL = '/resultados'; 

const ResultadosContext = createContext();

export const useResultados = () => useContext(ResultadosContext);

/**
 * Proveedor de Contexto para manejar la lógica de datos (CRUD) de las mesas testigo.
 * Maneja el estado global y las interacciones con la API (MockAPI).
 */
export const ResultadosProvider = ({ children }) => {
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(false);
    // El estado 'error' ahora se usa para errores de API y para mensajes de validación (duplicados)
    const [error, setError] = useState(null); 

    // Función auxiliar para obtener todos los resultados (GET /resultados)
    const obtenerResultados = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            const response = await resultadosApi.get(RECURSO_URL); 
            setResultados(response.data); 
        } catch (err) {
            console.error('Error al obtener resultados:', err);
            setError('No se pudieron cargar los resultados de la API.');
        } finally {
            setCargando(false);
        }
    }, []);

    /**
     * GET por ID: Busca y devuelve un solo resultado por su ID (GET /resultados/:id).
     * ✅ IMPLEMENTACIÓN REQUERIDA
     */
    const obtenerResultadoPorId = useCallback(async (id) => {
        setCargando(true);
        setError(null);
        try {
            const response = await resultadosApi.get(`${RECURSO_URL}/${id}`); 
            return response.data; // Devuelve el objeto del resultado
        } catch (err) {
            console.error(`Error al obtener resultado con ID ${id}:`, err);
            setError(`No se pudo cargar el resultado de la mesa ${id}.`);
            return null;
        } finally {
            setCargando(false);
        }
    }, []); 

    /**
     * POST: Crea una nueva mesa (POST /resultados).
     * 🚨 Implementa la validación de mesa duplicada.
     */
    const crearResultado = useCallback(async (nuevoResultado) => {
        setError(null);
        
        // 1. Verificar Duplicados (Chequeo en el estado actual de 'resultados')
        const mesaYaExiste = resultados.some(res => 
            res.mesaId === nuevoResultado.mesaId && 
            res.circuitoId === nuevoResultado.circuitoId
        );

        if (mesaYaExiste) {
            // Setea el error con el mensaje de duplicado
            setError(`La Mesa N° ${nuevoResultado.mesaId} del Circuito N° ${nuevoResultado.circuitoId} ya ha sido cargada.`);
            return false; // Indicamos fallo de validación
        }

        // 2. Si no existe, proceder con la creación
        try {
            const response = await resultadosApi.post(RECURSO_URL, nuevoResultado);
            // Agregar la nueva mesa al estado local
            setResultados(prev => [...prev, response.data]); 
            return true; // Indicamos éxito
        } catch (err) {
            console.error('Error al crear resultado:', err);
            setError('Error al crear el registro de la mesa en la API.');
            return false;
        }
    }, [resultados]); // Dependencia crítica: necesitamos el estado actual de 'resultados'

    // PUT: Actualizar una mesa existente (PUT /resultados/:id)
    const actualizarResultado = useCallback(async (id, datosActualizados) => {
        setError(null);
        try {
            const response = await resultadosApi.put(`${RECURSO_URL}/${id}`, datosActualizados);
            
            // Reemplazar la mesa antigua en el estado con la nueva versión
            setResultados(prev => prev.map(res => 
                res.id === id ? response.data : res
            ));
            return true;
        } catch (err) {
            console.error(`Error al actualizar resultado con ID ${id}:`, err);
            setError(`Error al actualizar el registro de la mesa ${id}.`);
            return false;
        }
    }, []);

    /**
     * DELETE: Eliminar una mesa (DELETE /resultados/:id).
     * ✅ IMPLEMENTACIÓN REQUERIDA
     */
    const eliminarResultado = useCallback(async (id) => {
        setError(null);
        try {
            await resultadosApi.delete(`${RECURSO_URL}/${id}`);
            // Actualizar el estado: filtrar el resultado eliminado
            setResultados(prev => prev.filter(res => res.id !== id));
            return true;
        } catch (err) {
            console.error(`Error al eliminar resultado con ID ${id}:`, err);
            setError(`Error al eliminar el registro de la mesa ${id}.`);
            return false;
        }
    }, []);


    // --- Valores del Contexto (TODAS LAS FUNCIONES ESTÁN DEFINIDAS) ---
    const contextValue = {
        resultados,
        cargando,
        error, 
        obtenerResultados,
        obtenerResultadoPorId, // ✅ YA ESTÁ DEFINIDA
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