// src/pages/ResultadoListado.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResultados } from '../context/ResultadosContext';
import ResultadoFila from '../components/ResultadoFila'; 

const ResultadoListado = () => {
  const navigate = useNavigate();
  const { resultados, cargando, error, obtenerResultados } = useResultados();

  // Cargar los datos al montar el componente
  useEffect(() => {
    if (resultados.length === 0) {
      obtenerResultados();
    }
  }, [obtenerResultados, resultados.length]);

  // --- Renderizado de Estados ---
  if (cargando) {
    return <div className="text-center p-10 text-xl text-blue-600">Cargando resultados...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-xl text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🗳️ Resultados Provisionales (Mesas Testigo)
        </h1>
        <button
          onClick={() => navigate('/items/create')}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md"
        >
          ➕ Registrar Nuevo Resultado
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Partido</th>
              <th className="py-3 px-6 text-center">Votos</th>
              <th className="py-3 px-6 text-center">Porcentaje</th>
              <th className="py-3 px-6 text-center">Circuito / Mesa</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {resultados.map((resultado) => (
              <ResultadoFila key={resultado.id} resultado={resultado} />
            ))}
            
            {resultados.length === 0 && (
                <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                        No hay resultados. Crea uno nuevo.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultadoListado;