import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResultados } from '../context/ResultadosContext';
import ResultadoFila from '../components/ResultadoFila';
import Footer from '../components/Footer';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 🎨 Colores institucionales por partido
const PARTY_COLORS = {
  PARTIDO_SOCIALISTA: ['#E34234', '#B0171F'],
  JUNTOS_POR_EL_CAMBIO: ['#FFD700', '#DAA520'],
  LA_LIBERTAD_AVANZA: ['#7B68EE', '#483D8B'],
  FUERZA_PATRIA: ['#00F', '#6A0DAD'],
  VOTOS_EN_BLANCO: ['#FFFFFF', '#999999'],
  VOTOS_NULOS: ['#A9A9A9', '#696969'],
  OTROS: ['#4CAF50', '#388E3C'],
};

const ResultadoListado = () => {
  const navigate = useNavigate();
  const { resultados, cargando, error, obtenerResultados } = useResultados();

  useEffect(() => {
    if (!resultados || resultados.length === 0) {
      obtenerResultados();
    }
  }, [obtenerResultados, resultados]);

  // 📊 Agrupación de votos por partido
  const chartData = useMemo(() => {
    const votosAgrupados = {};

    if (Array.isArray(resultados)) {
      resultados.forEach(mesa => {
        Object.keys(mesa).forEach(key => {
          if (key.startsWith('votos_')) {
            const nombrePartido = key.replace('votos_', '').toUpperCase();
            const votos = Number(mesa[key]) || 0;
            votosAgrupados[nombrePartido] = (votosAgrupados[nombrePartido] || 0) + votos;
          }
        });
      });
    }

    const labels = Object.keys(votosAgrupados);
    const data = Object.values(votosAgrupados);

    const backgroundColors = labels.map(label =>
      (PARTY_COLORS[label] && PARTY_COLORS[label][0]) || PARTY_COLORS['OTROS'][0]
    );
    const borderColors = labels.map(label =>
      (PARTY_COLORS[label] && PARTY_COLORS[label][1]) || PARTY_COLORS['OTROS'][1]
    );

    return {
      labels: labels.map(label => label.replace(/_/g, ' ')),
      datasets: [
        {
          label: 'Votos Consolidados por Partido',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  }, [resultados]);

  const hayDatosParaGrafico =
    Array.isArray(resultados) &&
    resultados.length > 0 &&
    chartData.labels.length > 0;

  if (cargando) {
    return (
      <div className="text-center p-10 text-xl text-blue-600 dark:text-blue-300">
        Cargando resultados...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-xl text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-10">
      {/* 🧭 Encabezado principal */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          🗳️ Resultados Provisorios - Mesas Testigo
        </h1>
        <button
          onClick={() => navigate('/items/create')}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center gap-2"
        >
          ➕ Registrar Nuevo Resultado
        </button>
      </div>

      {/* 📊 Gráfico de barras */}
      {hayDatosParaGrafico && (
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
            📊 Votos Totalizados por Partido
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Datos agregados de todas las mesas testigo registradas
          </p>
          <div className="h-96">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true, position: 'bottom' },
                  title: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Votos Totales' },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* 📋 Tabla de resultados */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 px-6 pt-6 mb-4 flex items-center gap-2">
          📋 Listado de Resultados por Mesa
        </h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Mesa y circuito</th>
              <th className="py-3 px-6 text-center">Partido Ganador</th>
              <th className="py-3 px-6 text-center">Total Votantes</th>
              <th className="py-3 px-6 text-center">Última Actualización</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
            {Array.isArray(resultados) &&
              resultados.map((resultado, index) => (
                <ResultadoFila key={resultado.id} resultado={resultado} />
              ))}

            {(!resultados || resultados.length === 0) && !cargando && !error && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500 bg-gray-50 dark:bg-gray-900">
                  No hay resultados. Crea un nuevo registro para ver la tabla.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Footer />
      </div>
    </div>
  );
};

export default ResultadoListado;
