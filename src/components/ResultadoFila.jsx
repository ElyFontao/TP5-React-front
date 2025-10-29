// 📁 src/components/ResultadoFila.jsx

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResultados } from '../context/ResultadosContext';

// ✅ Componente institucional para mostrar una fila de resultados por mesa
// Muestra trazabilidad electoral: mesa, circuito, partido líder, participación y acciones

const ResultadoFila = ({ resultado }) => {
  const navigate = useNavigate();
  const { eliminarResultado } = useResultados();

  // 🧠 Cálculo del partido con más votos y participación
  const partidoLider = useMemo(() => {
    let maxVotos = -1;
    let lider = 'N/A';

    Object.keys(resultado).forEach(key => {
      if (key.startsWith('votos_')) {
        const votos = Number(resultado[key]);
        if (votos > maxVotos) {
          maxVotos = votos;
          lider = key.replace('votos_', '').replace(/_/g, ' ');
        }
      }
    });

    const participacion = (resultado.totalElectores > 0 && resultado.totalVotantes)
      ? ((resultado.totalVotantes / resultado.totalElectores) * 100).toFixed(1)
      : '0.0';

    return { nombre: lider, votos: maxVotos, participacion };
  }, [resultado]);

  // 🗑️ Eliminar resultado con confirmación
  const handleEliminar = () => {
    if (window.confirm(`¿Eliminar el resultado de la Mesa ${resultado.mesaId}?`)) {
      eliminarResultado(resultado.id);
    }
  };

  // ✏️ Navegar a edición
  const handleEditar = () => {
    navigate(`/items/edit/${resultado.id}`);
  };

  // 📅 Formato de fecha
  const fechaActualizacion = resultado.actualizacion
    ? new Date(resultado.actualizacion).toLocaleString()
    : 'Desconocida';

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150">
      {/* 🏛️ Mesa y Circuito */}
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <span className="font-medium text-lg text-blue-800 dark:text-blue-300">
          Mesa {resultado.mesaId}
        </span>
        <span className="block text-xs text-gray-500 dark:text-gray-400">
          Circuito: {resultado.circuitoId}
        </span>
      </td>

      {/* 🥇 Partido líder */}
      <td className="py-3 px-6 text-center">
        <p className="font-semibold text-gray-800 dark:text-gray-100">{partidoLider.nombre}</p>
        <p className="text-xs text-green-600 dark:text-green-400">
          Con {partidoLider.votos} votos
        </p>
      </td>

      {/* 📊 Electores y participación */}
      <td className="py-3 px-6 text-center">
        <span className="block font-bold text-gray-900 dark:text-gray-100">
          {resultado.totalElectores}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Participación: {partidoLider.participacion}%
        </span>
      </td>

      {/* 📅 Fecha de actualización */}
      <td className="py-3 px-6 text-center text-xs text-gray-500 dark:text-gray-400">
        {fechaActualizacion}
      </td>

      {/* 🛠️ Acciones */}
      <td className="py-3 px-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={handleEditar}
            className="w-6 h-6 transform hover:text-purple-500 dark:hover:text-purple-300 hover:scale-110"
            title="Editar resultado"
          >
            ✏️
          </button>
          <button
            onClick={handleEliminar}
            className="w-6 h-6 transform hover:text-red-500 dark:hover:text-red-400 hover:scale-110"
            title="Eliminar resultado"
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ResultadoFila;
