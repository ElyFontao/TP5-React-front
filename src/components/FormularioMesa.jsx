import { useState, useMemo } from 'react';

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

  // 🔍 Filtrar circuitos por sección
  const circuitosDisponibles = useMemo(() => {
    return [...new Set(mesas.filter(m => m.seccionId === seccionId).map(m => m.circuitoId))];
  }, [seccionId, mesas]);

  // 🔍 Filtrar mesas por circuito
  const mesasDisponibles = useMemo(() => {
    return mesas.filter(m => m.seccionId === seccionId && m.circuitoId === circuitoId);
  }, [seccionId, circuitoId, mesas]);

  // 🔁 Disparar selección automáticamente al elegir mesa
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

  return (
    <div className="space-y-4">
      {/* Sección */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Departamento </label>
        <select
          value={seccionId}
          onChange={(e) => {
            setSeccionId(e.target.value);
            setCircuitoId('');
            setMesaId('');
          }}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Seleccionar sección</option>
          {[...new Set(mesas.map(m => m.seccionId))].map((sec) => (
            <option key={sec} value={sec}>
              {nombresSecciones[sec]}
            </option>
          ))}
        </select>
      </div>

      {/* Circuito */}
      {seccionId && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Circuito</label>
          <select
            value={circuitoId}
            onChange={(e) => {
              setCircuitoId(e.target.value);
              setMesaId('');
            }}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Seleccionar circuito</option>
            {circuitosDisponibles.map((c) => (
              <option key={c} value={c}>Circuito {c}</option>
            ))}
          </select>
        </div>
      )}

      {/* Mesa */}
      {circuitoId && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mesa</label>
          <select
            value={mesaId}
            onChange={handleMesaChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Seleccionar mesa</option>
            {mesasDisponibles.map((m) => (
              <option key={m.mesaId} value={m.mesaId}>
                Mesa {m.mesaId}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FormularioMesa;
