import { useEffect, useState } from 'react';
import { getResumenCatamarcaReal, getResultadosPorMesaReal } from '../api/nacionalApi';
import { useNavigate } from 'react-router-dom';
import FormularioMesa from '../components/FormularioMesa';
import ResultadosMesa from '../components/ResultadosMesa';
import AccionesMesa from '../components/AccionesMesa';
import Footer from '../components/Footer';

const VistaNacional = () => {
  const navigate = useNavigate();

  const [datosNacionales, setDatosNacionales] = useState(null);
  const [cargandoResumen, setCargandoResumen] = useState(true);
  const [errorResumen, setErrorResumen] = useState(null);

  const [todasLasMesas, setTodasLasMesas] = useState([]);
  const [mesaQuery, setMesaQuery] = useState('');
  const [mesaId, setMesaId] = useState('');
  const [circuitoId, setCircuitoId] = useState('');
  const [seccionId, setSeccionId] = useState('');
  const [resultadosMesa, setResultadosMesa] = useState(null);
  const [cargandoMesa, setCargandoMesa] = useState(false);
  const [errorMesa, setErrorMesa] = useState(null);

  const puedeCargar = true;

  const nombresSecciones = {
    '1': 'Capital',
    '2': 'Valle Viejo',
    '3': 'Capayán',
    '4': 'Ambato',
    '5': 'Paclín',
    '6': 'La Paz',
    '7': 'El Alto',
    '8': 'Santa Rosa',
    '9': 'Fray Mamerto Esquiú',
    '10': 'Pomán',
    '11': 'Andalgalá',
    '12': 'Antofagasta de la Sierra',
    '13': 'Belén',
    '14': 'Fiambalá',
    '15': 'Tinogasta',
    '16': 'Santa María'
  };

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        setCargandoResumen(true);
        const estado = await getResumenCatamarcaReal();
        setDatosNacionales({
          totalVotos: estado.cantidadVotantes,
          participacion: estado.participacionPorcentaje,
          mesasReportadas: estado.mesasTotalizadas
        });
      } catch (err) {
        setErrorResumen('No se pudo cargar el resumen real de Catamarca.');
      } finally {
        setCargandoResumen(false);
      }
    };
    fetchResumen();
  }, []);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const res = await fetch('/data/mesascatamarca.json');
        const raw = await res.json();
        const enriquecidas = raw.map(m => ({
          ...m,
          seccionNombre: nombresSecciones[m.seccionId] || `Sección ${m.seccionId}`
        }));
        setTodasLasMesas(enriquecidas);
      } catch (err) {
        console.error('❌ No se pudieron cargar las mesas de Catamarca');
      }
    };
    fetchMesas();
  }, []);

  const seleccionarSugerencia = (item) => {
    setMesaId(item.mesaId);
    setCircuitoId(item.circuitoId);
    setSeccionId(item.seccionId);
    setMesaQuery(`${item.mesaId} — ${item.seccionNombre} (${item.localidad})`);
    setErrorMesa(null);
    setResultadosMesa(null);
  };

  const consultarMesa = async () => {
    setErrorMesa(null);
    setResultadosMesa(null);

    if (!mesaId || !circuitoId || !seccionId || seccionId === '0') {
      setErrorMesa('⚠️ Seleccioná una mesa válida con sección y circuito.');
      return;
    }

    setCargandoMesa(true);
    try {
      const filtros = {
        anioEleccion: 2023,
        tipoRecuento: 1,
        tipoEleccion: 2,
        categoriaId: 3,
        distritoId: 3,
        seccionProvincialId: 0,
        seccionId,
        circuitoId,
        mesaId
      };

      const res = await getResultadosPorMesaReal(filtros);
      if (Array.isArray(res.valoresTotalizadosPositivos) && res.valoresTotalizadosPositivos.length > 0) {
        setResultadosMesa(res);
      } else {
        setErrorMesa('⚠️ No hay resultados oficiales disponibles para esta mesa.');
      }
    } catch (err) {
      setErrorMesa('❌ No se pudo obtener resultados para esta mesa.');
    } finally {
      setCargandoMesa(false);
    }
  };

  return (
    <section className="p-6 max-w-6xl mx-auto space-y-8">
       <header
    className="relative bg-blue-50 border border-blue-200 rounded-xl p-8 text-center shadow-md overflow-hidden"
    style={{
      backgroundImage: 'url("https://img.freepik.com/fotos-premium/mapa-provincia-catamarca-alfiler-mano-concepto-viaje-republica-argentina_362478-2240.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
    <div className="relative z-10">
      <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
        Resultados Electorales - Catamarca
      </h1>
      <p className="text-gray-700 mt-3 text-lg">
        Consulta por mesa, visualización comparativa y carga institucional.
      </p>
    </div>
  </header>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📊 Resumen Provincial</h2>
        {cargandoResumen ? (
          <p className="text-blue-600">⏳ Cargando resumen...</p>
        ) : errorResumen ? (
          <p className="text-red-600">{errorResumen}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white border-l-4 border-blue-500 p-4 shadow rounded">
              <h3 className="text-sm text-gray-500">Votos Totales</h3>
              <p className="text-2xl font-bold text-blue-700">{datosNacionales.totalVotos.toLocaleString()}</p>
            </div>
            <div className="bg-white border-l-4 border-green-500 p-4 shadow rounded">
              <h3 className="text-sm text-gray-500">Participación</h3>
              <p className="text-2xl font-bold text-green-700">{datosNacionales.participacion}%</p>
            </div>
            <div className="bg-white border-l-4 border-yellow-500 p-4 shadow rounded">
              <h3 className="text-sm text-gray-500">Mesas Reportadas</h3>
              <p className="text-2xl font-bold text-yellow-700">{datosNacionales.mesasReportadas}</p>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🔍 Buscar Mesa</h2>
        <FormularioMesa
          mesas={todasLasMesas}
          mesaQuery={mesaQuery}
          setMesaQuery={setMesaQuery}
          onSeleccionar={seleccionarSugerencia}
        />
       <button
  onClick={consultarMesa}
  disabled={!mesaId || !circuitoId || !seccionId}
  className={`mt-2 font-bold py-2 px-4 rounded w-full ${
    !mesaId || !circuitoId || !seccionId
      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
      : 'bg-blue-600 hover:bg-blue-700 text-white'
  }`}
>
  Consultar Mesa
</button>
        {errorMesa && <p className="mt-2 text-red-600">{errorMesa}</p>}
      </div>

      {cargandoMesa && <p className="text-blue-600">⏳ Consultando mesa...</p>}
      {resultadosMesa && <ResultadosMesa resultados={resultadosMesa} />}

      {resultadosMesa && (
        <>
          <AccionesMesa
            mesaId={mesaId}
            circuitoId={circuitoId}
            seccionId={seccionId}
            puedeCargar={puedeCargar}
          />
          <Footer />
        </>
      )}
    </section>
  );
};

export default VistaNacional;
