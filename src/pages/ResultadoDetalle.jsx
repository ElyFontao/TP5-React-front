// 📁 src/pages/ResultadoDetalle.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import resultadosApi from '../api/resultadosApi'; // 🧭 Instancia de Axios para API

const ResultadoDetalle = () => {
  const { id } = useParams(); // 🔍 Extrae el ID desde la URL
  const navigate = useNavigate();

  // 📦 Estados locales
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Efecto para obtener el resultado por ID
  useEffect(() => {
    const obtenerResultado = async () => {
      try {
        setCargando(true);
        const response = await resultadosApi.get(`/resultados/${id}`);
        setResultado(response.data);
      } catch (err) {
        console.error("Error al obtener detalle:", err);
        setError("No se pudo encontrar el resultado con ese ID.");
      } finally {
        setCargando(false);
      }
    };
    obtenerResultado();
  }, [id]);

  // ⏳ Estado de carga
  if (cargando) {
    return (
      <div className="text-center p-10 text-xl text-blue-600 dark:text-blue-300">
        Cargando detalles...
      </div>
    );
  }

  // ❌ Error al cargar
  if (error) {
    return (
      <div className="text-center p-10 text-xl text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  // ⚠️ Resultado no encontrado
  if (!resultado) {
    return (
      <div className="text-center p-10 text-xl text-gray-600 dark:text-gray-300">
        Resultado no encontrado.
      </div>
    );
  }

  // 📅 Formateo de fecha
  const fechaFormateada = resultado.actualizacion
    ? new Date(resultado.actualizacion).toLocaleString('es-AR')
    : 'Desconocida';

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white dark:bg-gray-900 rounded-xl shadow-2xl mt-8 space-y-8">
      {/* 🧭 Título institucional */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2">
        🗳️ Detalle del Resultado de Mesa
      </h1>

      {/* 🧾 Información principal */}
      <div className="mb-6">
        <p className="text-gray-500 dark:text-gray-400 font-medium">Partido Político</p>
        <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
          {resultado.nombrePartido}
        </p>
      </div>

      {/* 🧩 Datos territoriales */}
      <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">ID de Circuito</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {resultado.circuitoId}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">ID de Mesa</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {resultado.mesaId}
          </p>
        </div>
      </div>

      {/* 📊 Votos y porcentaje */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Votos Obtenidos</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {resultado.votos ? resultado.votos.toLocaleString('es-AR') : '0'}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Porcentaje de Votos</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {resultado.porcentaje ? `${resultado.porcentaje}%` : 'N/A'}
          </p>
        </div>
      </div>

      {/* 📅 Fecha de actualización */}
      <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
        Última Actualización: {fechaFormateada}
      </p>

      {/* ✅ Botones de acción */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => navigate('/items')}
          className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
        >
          ← Volver al Listado
        </button>
        <button
          onClick={() => navigate(`/items/${resultado.id}/edit`)}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
        >
          ✏️ Editar Resultado
        </button>
      </div>
    </div>
  );
};

export default ResultadoDetalle;
