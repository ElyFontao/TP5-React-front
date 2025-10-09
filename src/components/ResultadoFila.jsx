// src/components/ResultadoFila.jsx

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResultados } from '../context/ResultadosContext';

/**
 * Componente que representa una única fila de la Mesa Testigo en el listado.
 */
const ResultadoFila = ({ resultado }) => {
    const navigate = useNavigate();
    const { eliminarResultado } = useResultados();

    // 🚨 Lógica para encontrar el partido con más votos en esta mesa
    const partidoLider = useMemo(() => {
        let maxVotos = -1;
        let lider = 'N/A';
        
        // Itera sobre las claves del objeto 'resultado' (la mesa)
        Object.keys(resultado).forEach(key => {
            // Solo procesa los campos de votos
            if (key.startsWith('votos_')) {
                const votos = Number(resultado[key]);
                if (votos > maxVotos) {
                    maxVotos = votos;
                    // Formatea el nombre
                    lider = key.replace('votos_', '').replace(/_/g, ' ');
                }
            }
        });

        // Calcula la participación %
        const participacion = (resultado.totalElectores > 0 && resultado.totalVotantes)
            ? ((resultado.totalVotantes / resultado.totalElectores) * 100).toFixed(1)
            : '0.0';

        return { nombre: lider, votos: maxVotos, participacion: participacion };
    }, [resultado]);

    const handleEliminar = () => {
        if (window.confirm(`¿Estás seguro de eliminar el resultado de la Mesa ${resultado.mesaId}?`)) {
            eliminarResultado(resultado.id);
        }
    };

    const handleEditar = () => {
        // Navega a la ruta de edición
        navigate(`/items/edit/${resultado.id}`); 
    };
    
    // Formato de fecha
    const fechaActualizacion = resultado.actualizacion 
        ? new Date(resultado.actualizacion).toLocaleString() 
        : 'Desconocida';


    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
            {/* 1. Mesa y Circuito */}
            <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium text-lg text-blue-800">{resultado.mesaId}</span>
                <span className="block text-xs text-gray-500">Circuito: {resultado.circuitoId}</span>
            </td>
            
            {/* 2. Partido Ganador y Votos */}
            <td className="py-3 px-6 text-center">
                <p className="font-semibold">{partidoLider.nombre}</p>
                <p className="text-xs text-green-600">Con {partidoLider.votos} votos</p>
            </td>
            
            {/* 3. Total Electores y Participación */}
            <td className="py-3 px-6 text-center">
                <span className="block font-bold">{resultado.totalElectores}</span>
                <span className="text-sm text-gray-500">Participación: {partidoLider.participacion}%</span>
            </td>

            {/* 4. Actualización */}
            <td className="py-3 px-6 text-center text-xs text-gray-500">
                {fechaActualizacion}
            </td>

            {/* 5. Acciones */}
            <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center space-x-2">
                    <button onClick={handleEditar} className="w-6 h-6 transform hover:text-purple-500 hover:scale-110">
                        ✏️
                    </button>
                    <button onClick={handleEliminar} className="w-6 h-6 transform hover:text-red-500 hover:scale-110">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ResultadoFila;