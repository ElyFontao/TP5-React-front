// src/pages/ResultadoDetalle.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import resultadosApi from '../api/resultadosApi'; // Importa la instancia de Axios

const ResultadoDetalle = () => {
  const { id } = useParams(); // Obtiene el ID
  const navigate = useNavigate();
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerResultado = async () => {
      try {
        setCargando(true);
        // GET directo al API por ID
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

  if (cargando) {
    return <div className="text-center p-10 text-xl text-blue-600">Cargando detalles...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-xl text-red-600">{error}</div>;
  }

  if (!resultado) {
    return <div className="text-center p-10 text-xl text-gray-600">Resultado no encontrado.</div>;
  }
  
  // Formatear fecha si existe
  const fechaFormateada = resultado.actualizacion 
    ? new Date(resultado.actualizacion).toLocaleString('es-AR') 
    : 'Desconocida';

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-2xl mt-8">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">
        Detalle del Resultado de Mesa
      </h1>
      
      {/* Información Clave */}
      <div className="mb-6">
        <p className="text-gray-500 font-medium">Partido Político</p>
        <p className="text-3xl font-extrabold text-blue-700">{resultado.nombrePartido}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
        <div>
          <p className="text-gray-500 font-medium">ID de Circuito</p>
          <p className="text-xl font-semibold">{resultado.circuitoId}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">ID de Mesa</p>
          <p className="text-xl font-semibold">{resultado.mesaId}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 font-medium">Votos Obtenidos</p>
          <p className="text-2xl font-bold text-green-600">
            {resultado.votos ? resultado.votos.toLocaleString('es-AR') : '0'}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Porcentaje de Votos</p>
          <p className="text-2xl font-bold text-orange-600">
            {resultado.porcentaje ? `${resultado.porcentaje}%` : 'N/A'}
          </p>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-gray-400">
        Última Actualización: {fechaFormateada}
      </p>

      {/* Botones de acción */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => navigate('/items')}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Volver al Listado
        </button>
        <button
          onClick={() => navigate(`/items/${resultado.id}/edit`)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Editar Resultado
        </button>
      </div>
    </div>
  );
};

export default ResultadoDetalle;