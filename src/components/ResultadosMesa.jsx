import { TrophyIcon, ChartBarIcon } from '@heroicons/react/24/solid';

const ResultadosMesa = ({ resultados }) => {
  if (!resultados) return null;

  const agrupaciones = resultados.valoresTotalizadosPositivos;
  const totalVotos = agrupaciones.reduce((acc, curr) => acc + curr.votos, 0);

  // Ordenar por votos descendente
  const ordenadas = [...agrupaciones].sort((a, b) => b.votos - a.votos);
  const primera = ordenadas[0];

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-8">
      {/* Encabezado */}
      <div className="flex items-center gap-2 mb-4">
        <ChartBarIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">Resultados Oficiales por Agrupación</h3>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Votos positivos registrados en la mesa consultada. No incluye blancos, nulos ni recurridos.
      </p>

      {/* Tarjetas por agrupación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ordenadas.map((v, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 shadow-sm border ${
              v.nombreAgrupacion === primera.nombreAgrupacion
                ? 'bg-yellow-50 border-yellow-300'
                : 'bg-gray-50 border-gray-300'
            } hover:shadow-md transition`}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-semibold text-blue-700">{v.nombreAgrupacion}</h4>
              {v.nombreAgrupacion === primera.nombreAgrupacion && (
                <TrophyIcon className="w-5 h-5 text-yellow-500" />
              )}
            </div>
            <p className="text-xl font-bold text-gray-800">{v.votos.toLocaleString()} votos</p>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        <p>
          Total de votos positivos: <span className="font-semibold text-gray-800">{totalVotos.toLocaleString()}</span>
        </p>
      </div>
    </section>
  );
};

export default ResultadosMesa;
