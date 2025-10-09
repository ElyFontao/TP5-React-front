// src/components/ResultadoFormulario.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';

// Lista estática de partidos y su mapeo al campo plano de MockAPI (votos_NOMBRE)
const PARTIDOS_ESTATICOS = [
    { name: 'Partido Socialista', field: 'votos_PARTIDO_SOCIALISTA', placeholder: 'Votos PS', isCoalicion: true },
    { name: 'Juntos por el Cambio', field: 'votos_JUNTOS_POR_EL_CAMBIO', placeholder: 'Votos JxC', isCoalicion: true },
    { name: 'La Libertad Avanza', field: 'votos_LA_LIBERTAD_AVANZA', placeholder: 'Votos LLA' },
    { name: 'Fuerza Patria', field: 'votos_FUERZA_PATRIA', placeholder: 'Votos FP' },
    { name: 'Partido Unión Civica Radical', field: 'votos_UCR', placeholder: 'Votos UCR' }, // Agregado previamente
    // Votos especiales
    { name: 'Votos en Blanco', field: 'votos_VOTOS_EN_BLANCO', placeholder: 'Votos en Blanco', isEspecial: true },
    { name: 'Votos Nulos', field: 'votos_VOTOS_NULOS', placeholder: 'Votos Nulos', isEspecial: true },
];

/**
 * Componente de Formulario para Cargar/Editar los resultados de UNA MESA COMPLETA.
 */
const ResultadoFormulario = ({ resultadoAEditar, onSubmit, esEdicion }) => {
    
    const [datosMesa, setDatosMesa] = useState({
        mesaId: '', circuitoId: '', totalElectores: 0,
    });
    const [votosPartidos, setVotosPartidos] = useState(PARTIDOS_ESTATICOS.map(p => ({
        ...p, votos: 0,
    })));
    const [errorForm, setErrorForm] = useState(null); // Estado para mensajes de error de validación

    // --- CÁLCULOS AUTOMÁTICOS Y VALIDACIÓN ---
    const { totalVotos, participacionPorcentaje } = useMemo(() => {
        // Suma todos los votos cargados (partidos + blanco + nulo)
        const sumaVotos = votosPartidos.reduce((sum, p) => sum + (Number(p.votos) || 0), 0);
        
        const totalElectores = Number(datosMesa.totalElectores);
        
        // Cálculo de participación automática
        const participacion = (totalElectores > 0 && sumaVotos)
            ? ((sumaVotos / totalElectores) * 100).toFixed(2) // Dos decimales
            : '0.00';

        return { 
            totalVotos: sumaVotos, 
            participacionPorcentaje: participacion 
        };
    }, [votosPartidos, datosMesa.totalElectores]);

    // --- Efecto de Carga para Edición ---
    useEffect(() => {
        if (resultadoAEditar && esEdicion) {
            setDatosMesa({
                mesaId: resultadoAEditar.mesaId || '',
                circuitoId: resultadoAEditar.circuitoId || '',
                totalElectores: resultadoAEditar.totalElectores || 0,
            });

            // CONVERSIÓN DE PLANO A ESTADO INTERNO (Lectura)
            const votosActualizados = PARTIDOS_ESTATICOS.map(pEstatico => {
                const votosMesa = resultadoAEditar[pEstatico.field] || 0; 
                return {
                    ...pEstatico,
                    votos: votosMesa,
                };
            });
            setVotosPartidos(votosActualizados);
        }
    }, [resultadoAEditar, esEdicion]);

    // --- Manejadores de Cambio ---
    const handleMesaChange = useCallback((e) => {
        const { name, value } = e.target;
        // Asegurar que los campos numéricos sean números
        setDatosMesa(prev => ({ 
            ...prev, 
            [name]: (name === 'totalElectores' ? Number(value) : value)
        }));
        setErrorForm(null); // Limpiar errores al cambiar
    }, []);
    
    const handleVotoChange = useCallback((index, value) => {
        // 🚨 PREVENCIÓN DE VOTOS NEGATIVOS
        const votos = Math.max(0, Number(value));
        
        setVotosPartidos(prev => prev.map((p, i) => 
            i === index ? { ...p, votos: votos } : p
        ));
        setErrorForm(null); // Limpiar errores al cambiar
    }, []);

    // --- Manejador de Envío y Validación Final ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // 🚨 VALIDACIÓN PRINCIPAL: Votos Contados vs. Electores
        if (totalVotos > datosMesa.totalElectores) {
            setErrorForm("Error: El Total de Votos Contados (" + totalVotos + ") no puede ser mayor que el Total de Electores (" + datosMesa.totalElectores + ").");
            return;
        }

        // 🚨 VALIDACIÓN MÍNIMA: Mesa y Circuito no pueden estar vacíos
        if (!datosMesa.mesaId || !datosMesa.circuitoId || datosMesa.totalElectores <= 0) {
            setErrorForm("Error: Por favor complete los campos de Mesa, Circuito y Total de Electores.");
            return;
        }


        // CONVERSIÓN DE ESTADO INTERNO A PLANO (Escritura para MockAPI):
        const votosPlanos = votosPartidos.reduce((obj, p) => {
            // Solo incluimos campos si tienen votos > 0 para MockAPI
            if (Number(p.votos) > 0) {
                obj[p.field] = Number(p.votos); 
            }
            return obj;
        }, {});

        // Objeto de la mesa final listo para enviar a la API
        const resultadoFinal = {
            ...datosMesa,
            ...votosPlanos, 
            totalVotantes: totalVotos, // Cálculo automático
            participacionPorcentaje: Number(participacionPorcentaje), // Almacenar el % calculado
            actualizacion: new Date().toISOString(),
        };

        // Si pasa todas las validaciones
        onSubmit(resultadoFinal);
    };

    // Resumen de Votación (Read-Only)
    const diferenciaVotantes = datosMesa.totalElectores - totalVotos;

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-2xl space-y-6">
            
            <h2 className="text-2xl font-bold text-blue-700 border-b pb-3 mb-4">Datos de la Mesa de Votación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><label className="block text-sm font-medium text-gray-700">Mesa N°</label>
                    <input type="text" name="mesaId" value={datosMesa.mesaId} onChange={handleMesaChange} required
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Circuito N°</label>
                    <input type="text" name="circuitoId" value={datosMesa.circuitoId} onChange={handleMesaChange} required
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Total Electores Empadronados</label>
                    <input type="number" name="totalElectores" value={datosMesa.totalElectores} onChange={handleMesaChange} required
                           min="1" // Electores no pueden ser 0 o menos
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
            </div>

            <h2 className="text-2xl font-bold text-green-700 border-b pb-3 pt-6 mb-4">Votos por Fuerza Política</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {votosPartidos.map((p, index) => (
                    <div key={p.field}>
                        <label className={`block text-sm font-medium ${p.isEspecial ? 'text-red-700' : 'text-gray-700'}`}>
                            {p.name}
                        </label>
                        <input type="number" value={p.votos} onChange={(e) => handleVotoChange(index, e.target.value)}
                               placeholder={p.placeholder} 
                               min="0" // 🚨 Bloquea la entrada de votos negativos en el navegador
                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg font-semibold" />
                    </div>
                ))}
            </div>

            {/* Mensaje de Error de Validación */}
            {errorForm && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mt-4" role="alert">
                    <p className="font-bold">Error de Validación</p>
                    <p>{errorForm}</p>
                </div>
            )}

            {/* Resumen de Votación (Read-Only) */}
            <div className="pt-6 border-t mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Resumen del Acta</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="col-span-1"><p className="font-medium text-gray-600">Total Votos Emitidos Validos:</p>
                        <p className="text-2xl font-extrabold text-blue-600">{totalVotos}</p></div>
                    <div className="col-span-1"><p className="font-medium text-gray-600">Total Electores habilitados:</p>
                        <p className="text-2xl font-extrabold text-gray-800">{datosMesa.totalElectores}</p></div>
                    <div className="col-span-1"><p className="font-medium text-gray-600">Falta Votar (Electores - Votantes):</p>
                        <p className={`text-2xl font-extrabold ${diferenciaVotantes < 0 ? 'text-red-600' : 'text-green-600'}`}>{diferenciaVotantes}</p></div>
                    
                    {/* 🚨 Cálculo de Participación Automática */}
                    <div className="col-span-1"><p className="font-medium text-gray-600">Participación %:</p>
                        <p className="text-2xl font-extrabold text-purple-600">{participacionPorcentaje}%</p></div>
                </div>
            </div>

            {/* Botón de Acción */}
            <div className="flex justify-end pt-6">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
                    {esEdicion ? 'Guardar Cambios' : 'Registrar Mesa Completa'}
                </button>
            </div>
        </form>
    );
};

export default ResultadoFormulario;