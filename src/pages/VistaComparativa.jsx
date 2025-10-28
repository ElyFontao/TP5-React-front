import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { compararMesaEntreElecciones } from '../api/nacionalApi';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Chart } from 'chart.js/auto';

const VistaComparativa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);


  const { mesaId, circuitoId, seccionId } = location.state || {};
  const [comparacion, setComparacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mesaId || !circuitoId) {
      setError('No se recibió información de la mesa seleccionada.');
      setCargando(false);
      return;
    }

    const fetchComparacion = async () => {
      try {
        const datos = await compararMesaEntreElecciones({ mesaId, circuitoId, seccionId });

        if (!datos?.datos2025 || typeof datos.datos2025.totalVotantes === 'undefined') {
          setError(`No existe mesa testigo para comparar con ${mesaId} / circuito ${circuitoId}.`);
        } else {
          setComparacion(datos);
        }
      } catch (err) {
        console.error('❌ Error en comparación:', err);
        setError('No se pudo realizar la comparación.');
      } finally {
        setCargando(false);
      }
    };

    fetchComparacion();
  }, [mesaId, circuitoId, seccionId]);

  useEffect(() => {
  if (!cargando && comparacion && canvasRef.current) {
    // 🔁 Destruir gráfico anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const p2023 = parseFloat(comparacion.datos2023?.participacionPorcentaje || 0);
    const p2025 = parseFloat(comparacion.datos2025?.participacionPorcentaje || 0);

    const newChart = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['2023', '2025'],
        datasets: [{
          data: [p2023, p2025],
          backgroundColor: ['#2563EB', '#10B981'],
          borderColor: ['#1E3A8A', '#065F46'],
          borderWidth: 3,
          hoverOffset: 12
        }]
      },
      options: {
        animation: {
          animateScale: true,
          duration: 1200,
          easing: 'easeOutBounce'
        },
        plugins: {
          title: {
            display: true,
            text: `Participación Electoral - Mesa ${mesaId}`,
            font: {
              size: 18,
              family: 'Inter',
              weight: 'bold'
            },
            color: '#374151'
          },
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14,
                family: 'Inter'
              },
              color: '#374151'
            }
          },
          tooltip: {
            backgroundColor: '#F9FAFB',
            titleColor: '#111827',
            bodyColor: '#1F2937',
            borderColor: '#D1D5DB',
            borderWidth: 1
          }
        }
      }
    });

    // ✅ Guardar instancia para destruirla luego
    chartInstanceRef.current = newChart;
  }
}, [cargando, comparacion]);

  return (
    <section className="p-6 max-w-6xl mx-auto space-y-8 reporte-institucional" data-fecha={new Date().toLocaleDateString()}>
      <header className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
          📊 Comparativa Electoral 2023 vs 2025
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Comparación de participación y votos positivos entre elecciones nacionales 2023 y simulación 2025 para la mesa seleccionada.
        </p>
      </header>

      {cargando ? (
        <p className="text-blue-600 text-center">⏳ Cargando comparación...</p>
      ) : error ? (
  <div className="text-center bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 shadow-sm">
    <h3 className="text-xl font-semibold mb-2">⚠️ Mesa no disponible para comparación</h3>
    <p className="text-sm">
      {error} <br />
      Esta mesa no tiene datos cargados en base de datos de mesas testigos para 2025.
    </p>
    <button
      onClick={() => navigate(-1)}
      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-full shadow-md transition-transform hover:scale-105"
    >
      <ArrowLeftIcon className="w-5 h-5 text-white" />
      Volver atrás
    </button>
  </div>
) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
            <table className="min-w-full bg-white dark:bg-gray-900">
              <thead className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Mesa</th>
                  <th className="px-4 py-3 text-left font-semibold">Circuito</th>
                  <th className="px-4 py-3 text-left font-semibold">Participación 2023</th>
                  <th className="px-4 py-3 text-left font-semibold">Participación 2025</th>
                  <th className="px-4 py-3 text-left font-semibold">Comportamiento electoral</th>
                  <th className="px-4 py-3 text-left font-semibold">Diferencial de votos positivos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {(() => {
                  const p2023 = parseFloat(comparacion.datos2023?.participacionPorcentaje || 0);
                  const p2025 = parseFloat(comparacion.datos2025?.participacionPorcentaje || 0);
                  const deltaP = (p2025 - p2023).toFixed(2);

                  const votos2023 = comparacion.datos2023?.cantidadVotantes || 0;
                  const votos2025 = comparacion.datos2025?.cantidadVotantes || 0;
                  const deltaV = votos2025 - votos2023;

                  const deltaColor = deltaP > 0 ? 'text-green-600' : deltaP < 0 ? 'text-red-600' : 'text-gray-600';

                  return (
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200">{mesaId}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{circuitoId}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{p2023}%</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{p2025}%</td>
                      <td className={`px-4 py-2 font-semibold ${deltaColor}`}>{deltaP}%</td>
                      <td className={`px-4 py-2 font-semibold ${deltaColor}`}>{deltaV > 0 ? `+${deltaV}` : deltaV}</td>
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Visualización de Participación Electoral
            </h3>
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-md max-w-md"
            />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 print:hidden">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-full shadow-md transition-transform hover:scale-105"
            >
              <ArrowLeftIcon className="w-5 h-5 text-white" />
              Volver atrás
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-full shadow-md transition-transform hover:scale-105"
            >
              🖨️ Imprimir reporte
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default VistaComparativa;
