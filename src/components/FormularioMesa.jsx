import { useState, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'; // Asegurate de tener Heroicons instalado

const FormularioMesa = ({ mesas, onSeleccionar, mesaQuery, setMesaQuery }) => {
  const [sugerenciasAbiertas, setSugerenciasAbiertas] = useState(false);

  const sugerencias = useMemo(() => {
    const q = mesaQuery.trim().toLowerCase();
    if (!q) return mesas;
    return mesas.filter(
      m =>
        m.mesaId.includes(q) ||
        m.circuitoId.includes(q) ||
        m.localidad.toLowerCase().includes(q)
    );
  }, [mesaQuery, mesas]);

  return (
    <div className="relative">
      <label htmlFor="buscador-mesa" className="block text-sm font-medium text-gray-700 mb-1">
        Buscar mesa por ID, circuito o localidad
      </label>
      <div className="relative">
        <input
          id="buscador-mesa"
          type="text"
          value={mesaQuery}
          onChange={(e) => {
            setMesaQuery(e.target.value);
            setSugerenciasAbiertas(true);
          }}
          placeholder="Ej: 896, 00124, Belén"
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
      </div>

      {sugerenciasAbiertas && sugerencias.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
          {sugerencias.map((s, idx) => (
            <li
              key={idx}
              onClick={() => {
                onSeleccionar(s);
                setSugerenciasAbiertas(false);
              }}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition text-sm text-gray-700"
            >
              <span className="font-semibold text-blue-700">{s.mesaId}</span> — Sección {s.seccionId} · {s.localidad}
            </li>
          ))}
        </ul>
      )}

      {sugerenciasAbiertas && sugerencias.length === 0 && (
        <div className="mt-2 text-sm text-gray-500 italic">Sin coincidencias encontradas.</div>
      )}
    </div>
  );
};

export default FormularioMesa;
