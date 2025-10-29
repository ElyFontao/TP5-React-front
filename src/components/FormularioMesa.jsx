// 📁 src/components/FormularioMesa.jsx

import { useState, useMemo } from 'react';

// ✅ Componente institucional para trazabilidad territorial
// Modela progresión Sección → Circuito → Mesa con accesibilidad, modo oscuro y experiencia mejorada

const FormularioMesa = ({ mesas, onSeleccionar }) => {
  const [seccionId, setSeccionId] = useState('');
  const [circuitoId, setCircuitoId] = useState('');
  const [mesaId, setMesaId] = useState('');

  // 🧭 Mapeo de nombres institucionales por sección
  const nombresSecciones = useMemo(() => {
    const mapa = {};
    mesas.forEach((m) => {
      if (!mapa[m.seccionId]) {
        mapa[m.seccionId] = m.seccionNombre || `Sección ${m.seccionId}`;
      }
    });
    return mapa;
  }, [mesas]);

  // 🔍 Circuitos disponibles según sección
  const circuitosDisponibles = useMemo(() => {
    return [...new Set(mesas.filter(m => m.seccionId === seccionId).map(m => m.circuitoId))];
  }, [seccionId, mesas]);

  // 🔍 Mesas disponibles según circuito
  const mesasDisponibles = useMemo(() => {
    return mesas.filter(m => m.seccionId === seccionId && m.circuitoId === circuitoId);
  }, [seccionId, circuitoId, mesas]);

  // 🔁 Disparar selección al elegir mesa
  const handleMesaChange = (e) => {
    const id = e.target.value;
    setMesaId(id);
    const mesaSeleccionada = mesas.find(
      m => m.seccionId === seccionId && m.circuitoId === circuitoId && m.mesaId === id
    );
    if (mesaSeleccionada) {
      onSeleccionar(mesaSeleccionada);
    }
  };

  // 🔄 Reiniciar selección completa
  const reiniciarFormulario = () => {
    setSeccionId('');
    setCircuitoId('');
    setMesaId('');
  };

  return (
    <div className="space-y-6 animate-fade-in" aria-label="Formulario de selección territorial">
      {/* 🏛️ Sección / Departamento */}
      <div>
        <label htmlFor="seccion" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Departamento <span className="ml-1 text-xs text-gray-500 dark:text-gray-400" title="Seleccioná el departamento electoral">ⓘ</span>
        </label>
        <select
          id="seccion"
          value={seccionId}
          onChange={(e) => {
            setSeccionId(e.target.value);
            setCircuitoId('');
            setMesaId('');
          }}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-4 py-2 transition-colors"
        >
          <option value="">Seleccionar sección</option>
          {[...new Set(mesas.map(m => m.seccionId))].map((sec) => (
            <option key={sec} value={sec}>
              {nombresSecciones[sec]}
            </option>
          ))}
        </select>
      </div>

      {/* 🧭 Circuito */}
      {seccionId && (
        <div className="animate-fade-in">
          <label htmlFor="circuito" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Circuito <span className="ml-1 text-xs text-gray-500 dark:text-gray-400" title="Seleccioná el circuito dentro del departamento">ⓘ</span>
          </label>
          <select
            id="circuito"
            value={circuitoId}
            onChange={(e) => {
              setCircuitoId(e.target.value);
              setMesaId('');
            }}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-4 py-2 transition-colors"
            disabled={circuitosDisponibles.length === 0}
          >
            <option value="">Seleccionar circuito</option>
            {circuitosDisponibles.map((c) => (
              <option key={c} value={c}>Circuito {c}</option>
            ))}
          </select>
          {circuitosDisponibles.length === 0 && (
            <p className="text-xs text-red-500 mt-1">No hay circuitos disponibles para esta sección.</p>
          )}
        </div>
      )}

      {/* 🗳️ Mesa */}
      {circuitoId && (
        <div className="animate-fade-in">
          <label htmlFor="mesa" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Mesa <span className="ml-1 text-xs text-gray-500 dark:text-gray-400" title="Seleccioná la mesa específica">ⓘ</span>
          </label>
          <select
            id="mesa"
            value={mesaId}
            onChange={handleMesaChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-4 py-2 transition-colors"
            disabled={mesasDisponibles.length === 0}
          >
            <option value="">Seleccionar mesa</option>
            {mesasDisponibles.map((m) => (
              <option key={m.mesaId} value={m.mesaId}>
                Mesa {m.mesaId}
              </option>
            ))}
          </select>
          {mesasDisponibles.length === 0 && (
            <p className="text-xs text-red-500 mt-1">No hay mesas disponibles para este circuito.</p>
          )}
        </div>
      )}

      {/* 🔄 Botón de reinicio */}
      {(seccionId || circuitoId || mesaId) && (
        <button
          onClick={reiniciarFormulario}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
        >
          Reiniciar selección
        </button>
      )}
    </div>
  );
};

export default FormularioMesa;
