// src/views/VistaComparativa.jsx
import { useState, useEffect } from 'react';
import { compararMesaEntreElecciones } from '../api/nacionalApi';

const MESAS_SIMULADAS_2025 = [
  { mesaId: '896', circuitoId: '00124', seccionId: '13' }
  
];

const VistaComparativa = () => {
  const [comparaciones, setComparaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparaciones = async () => {
      try {
        const resultados = await Promise.all(
          MESAS_SIMULADAS_2025.map(async (mesa) => {
            const datos = await compararMesaEntreElecciones(mesa);
            return {
              mesaId: mesa.mesaId,
              circuitoId: mesa.circuitoId,
              seccionId: mesa.seccionId,
              datos2023: datos.datos2023,
              datos2025: datos.datos2025
            };
          })
        );
        setComparaciones(resultados);
      } catch (err) {
        console.error('❌ Error en comparación:', err);
        setError('No se pudo cargar la comparación entre elecciones.');
      } finally {
        setCargando(false);
      }
    };

    fetchComparaciones();
  }, []);

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">📊 Comparativa Electoral 2023 vs 2025</h2>
      <p className="mb-6 text-gray-600">
        Comparación de participación y votos positivos entre elecciones nacionales 2023 y simulación 2025 para mesas seleccionadas.
      </p>

      {cargando ? (
        <p className="text-blue-600">⏳ Cargando comparaciones...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Mesa</th>
                <th className="px-4 py-3 text-left font-semibold">Circuito</th>
                <th className="px-4 py-3 text-left font-semibold">Participación 2023</th>
                <th className="px-4 py-3 text-left font-semibold">Participación 2025</th>
                <th className="px-4 py-3 text-left font-semibold">Δ Participación</th>
                <th className="px-4 py-3 text-left font-semibold">Δ Votos Positivos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparaciones.map((c, idx) => {
                const p2023 = parseFloat(c.datos2023?.participacionPorcentaje || 0);
                const p2025 = parseFloat(c.datos2025?.participacionPorcentaje || 0);
                const deltaP = (p2025 - p2023).toFixed(2);

                const votos2023 = c.datos2023?.cantidadVotantes || 0;
                const votos2025 = c.datos2025?.cantidadVotantes || 0;
                const deltaV = votos2025 - votos2023;

                const deltaColor = deltaP > 0 ? 'text-green-600' : deltaP < 0 ? 'text-red-600' : 'text-gray-600';

                return (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 font-medium text-gray-700">{c.mesaId}</td>
                    <td className="px-4 py-2 text-gray-600">{c.circuitoId}</td>
                    <td className="px-4 py-2 text-gray-600">{p2023}%</td>
                    <td className="px-4 py-2 text-gray-600">{p2025}%</td>
                    <td className={`px-4 py-2 font-semibold ${deltaColor}`}>{deltaP}%</td>
                    <td className={`px-4 py-2 font-semibold ${deltaColor}`}>{deltaV > 0 ? `+${deltaV}` : deltaV}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default VistaComparativa;
