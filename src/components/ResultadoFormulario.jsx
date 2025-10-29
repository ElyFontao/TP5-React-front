import React, { useState, useEffect, useMemo, useCallback } from 'react';

// 🧭 Lista institucional de partidos
const PARTIDOS_ESTATICOS = [
  { name: 'Partido Socialista', field: 'votos_PARTIDO_SOCIALISTA', placeholder: 'Votos PS', isCoalicion: true },
  { name: 'Juntos por el Cambio', field: 'votos_JUNTOS_POR_EL_CAMBIO', placeholder: 'Votos JxC', isCoalicion: true },
  { name: 'La Libertad Avanza', field: 'votos_LA_LIBERTAD_AVANZA', placeholder: 'Votos LLA' },
  { name: 'Fuerza Patria', field: 'votos_FUERZA_PATRIA', placeholder: 'Votos FP' },
  { name: 'Partido Unión Civica Radical', field: 'votos_UCR', placeholder: 'Votos UCR' },
  { name: 'Votos en Blanco', field: 'votos_VOTOS_EN_BLANCO', placeholder: 'Votos en Blanco', isEspecial: true },
  { name: 'Votos Nulos', field: 'votos_VOTOS_NULOS', placeholder: 'Votos Nulos', isEspecial: true },
];

// ✅ Componente institucional para carga/edición de resultados por mesa
const ResultadoFormulario = ({ resultadoAEditar, onSubmit, onCancel, esEdicion }) => {
  const [datosMesa, setDatosMesa] = useState({
    mesaId: '', circuitoId: '', totalElectores: 0,
  });

  const [votosPartidos, setVotosPartidos] = useState(PARTIDOS_ESTATICOS.map(p => ({
    ...p, votos: 0,
  })));

  const [errorForm, setErrorForm] = useState(null);

  // 📊 Cálculo automático de participación
  const { totalVotos, participacionPorcentaje } = useMemo(() => {
    const sumaVotos = votosPartidos.reduce((sum, p) => sum + (Number(p.votos) || 0), 0);
    const totalElectores = Number(datosMesa.totalElectores);
    const participacion = (totalElectores > 0 && sumaVotos)
      ? ((sumaVotos / totalElectores) * 100).toFixed(2)
      : '0.00';
    return { totalVotos: sumaVotos, participacionPorcentaje: participacion };
  }, [votosPartidos, datosMesa.totalElectores]);

  // 📝 Carga de datos si es edición
  useEffect(() => {
    if (resultadoAEditar && esEdicion) {
      setDatosMesa({
        mesaId: resultadoAEditar.mesaId || '',
        circuitoId: resultadoAEditar.circuitoId || '',
        totalElectores: resultadoAEditar.totalElectores || 0,
      });

      const votosActualizados = PARTIDOS_ESTATICOS.map(p => ({
        ...p,
        votos: resultadoAEditar[p.field] || 0,
      }));
      setVotosPartidos(votosActualizados);
    }
  }, [resultadoAEditar, esEdicion]);

  // 🔁 Manejadores de cambio
  const handleMesaChange = useCallback((e) => {
    const { name, value } = e.target;
    setDatosMesa(prev => ({
      ...prev,
      [name]: name === 'totalElectores' ? Number(value) : value,
    }));
    setErrorForm(null);
  }, []);

  const handleVotoChange = useCallback((index, value) => {
    const votos = Math.max(0, Number(value));
    setVotosPartidos(prev => prev.map((p, i) =>
      i === index ? { ...p, votos } : p
    ));
    setErrorForm(null);
  }, []);

  // ✅ Validación y envío
  const handleSubmit = (e) => {
    e.preventDefault();

    if (totalVotos > datosMesa.totalElectores) {
      setErrorForm(`Error: Votos (${totalVotos}) no pueden superar electores (${datosMesa.totalElectores}).`);
      return;
    }

    if (!datosMesa.mesaId || !datosMesa.circuitoId || datosMesa.totalElectores <= 0) {
      setErrorForm("Error: Completá Mesa, Circuito y Total de Electores.");
      return;
    }

    const votosPlanos = votosPartidos.reduce((obj, p) => {
      if (Number(p.votos) > 0) obj[p.field] = Number(p.votos);
      return obj;
    }, {});

    const resultadoFinal = {
      ...datosMesa,
      ...votosPlanos,
      totalVotantes: totalVotos,
      participacionPorcentaje: Number(participacionPorcentaje),
      actualizacion: new Date().toISOString(),
    };

    onSubmit(resultadoFinal);
  };

  const diferenciaVotantes = datosMesa.totalElectores - totalVotos;

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl space-y-6 transition-colors">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 border-b pb-3 mb-4">
        Datos de la Mesa de Votación
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['mesaId', 'circuitoId', 'totalElectores'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {field === 'mesaId' ? 'Mesa N°' : field === 'circuitoId' ? 'Circuito N°' : 'Total Electores'}
            </label>
            <input
              type={field === 'totalElectores' ? 'number' : 'text'}
              name={field}
              value={datosMesa[field]}
              onChange={handleMesaChange}
              required
              min={field === 'totalElectores' ? 1 : undefined}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm p-2 transition-colors"
            />
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 border-b pb-3 pt-6 mb-4">
        Votos por Fuerza Política
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {votosPartidos.map((p, index) => (
          <div key={p.field}>
            <label className={`block text-sm font-medium ${p.isEspecial ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-200'}`}>
              {p.name}
            </label>
            <input
              type="number"
              value={p.votos}
              onChange={(e) => handleVotoChange(index, e.target.value)}
              placeholder={p.placeholder}
              min="0"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm p-2 text-lg font-semibold transition-colors"
            />
          </div>
        ))}
      </div>
  {/* 🛑 Mensaje de error de validación */}
      {errorForm && (
        <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-3 mt-4" role="alert">
          <p className="font-bold">Error de Validación</p>
          <p>{errorForm}</p>
        </div>
      )}

      {/* 📊 Resumen del acta */}
      <div className="pt-6 border-t mt-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Resumen del Acta</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">Total Votos Emitidos:</p>
            <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{totalVotos}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">Total Electores:</p>
            <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">{datosMesa.totalElectores}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">Falta Votar:</p>
            <p className={`text-2xl font-extrabold ${diferenciaVotantes < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
              {diferenciaVotantes}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">Participación %:</p>
            <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">{participacionPorcentaje}%</p>
          </div>
        </div>
      </div>

      {/* ✅ Botón de acción */}
     <div className="flex justify-end pt-6 space-x-4">
  <button
    type="button"
    onClick={() => {
      const confirmar = window.confirm('¿Seguro que querés cancelar la carga? Los datos no se guardarán.');
      if (confirmar && onCancel) {
        onCancel();
      }
    }}
    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold py-3 px-6 rounded-lg shadow transition duration-300"
  >
    Cancelar
  </button>

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
  >
    {esEdicion ? 'Guardar Cambios' : 'Registrar Mesa Completa'}
  </button>
</div>
    </form>
  );
};

export default ResultadoFormulario;