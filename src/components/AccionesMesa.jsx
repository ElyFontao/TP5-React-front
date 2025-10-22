import { useNavigate } from 'react-router-dom';

const AccionesMesa = ({ mesaId, circuitoId, seccionId, puedeCargar }) => {
  const navigate = useNavigate();

  return (
    <section className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🧭 Acciones disponibles para la mesa <span className="text-blue-700 font-bold">{mesaId}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate(`/mesa/${mesaId}/${circuitoId}/${seccionId}/comparativa`)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded transition duration-200"
        >
          <span>📊</span>
          <span>Ver Comparativa 2023 vs 2025</span>
        </button>

        {puedeCargar && (
          <button
            onClick={() => navigate('/items')}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded transition duration-200"
          >
            <span>🧭</span>
            <span>Ir al Gestor Mesas Testigo</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default AccionesMesa;
