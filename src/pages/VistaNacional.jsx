import { useEffect, useState } from 'react';
import { getResumenCatamarcaReal, getResultadosPorMesaReal } from '../api/nacionalApi';
import { useNavigate } from 'react-router-dom';
import FormularioMesa from '../components/FormularioMesa';
import ResultadosMesa from '../components/ResultadosMesa';
import AccionesMesa from '../components/AccionesMesa';
import Footer from '../components/Footer';

const MESAS_CATAMARCA = [
  { mesaId: '125', circuitoId: '00003', seccionId: '1', localidad: 'San Fernando del Valle' },
  { mesaId: '127', circuitoId: '00003', seccionId: '1', localidad: 'San Fernando del Valle' },
  { mesaId: '733', circuitoId: '00081', seccionId: '9', localidad: 'Fray Mamerto Esquiu' },
  { mesaId: '986', circuitoId: '00143', seccionId: '15', localidad: 'Tinogasta' },
  { mesaId: '1049', circuitoId: '00154', seccionId: '16', localidad: 'Santa Maria' },
  { mesaId: '896', circuitoId: '00124', seccionId: '13', localidad: 'Belén' }
];

const VistaNacional = () => {
  const navigate = useNavigate();

  const [datosNacionales, setDatosNacionales] = useState(null);
  const [cargandoResumen, setCargandoResumen] = useState(true);
  const [errorResumen, setErrorResumen] = useState(null);

  const [mesaQuery, setMesaQuery] = useState('');
  const [mesaId, setMesaId] = useState('');
  const [circuitoId, setCircuitoId] = useState('');
  const [seccionId, setSeccionId] = useState('');
  const [resultadosMesa, setResultadosMesa] = useState(null);
  const [cargandoMesa, setCargandoMesa] = useState(false);
  const [errorMesa, setErrorMesa] = useState(null);

  const puedeCargar = true;

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

  const seleccionarSugerencia = (item) => {
    setMesaId(item.mesaId);
    setCircuitoId(item.circuitoId);
    setSeccionId(item.seccionId);
    setMesaQuery(`${item.mesaId} — ${item.seccionId} (${item.localidad})`);
    setErrorMesa(null);
    setResultadosMesa(null);
  };

  const consultarMesa = async () => {
    setErrorMesa(null);
    setResultadosMesa(null);

    if (!mesaId || !circuitoId || !seccionId) {
      setErrorMesa('⚠️ Seleccioná o ingresá una mesa, circuito y sección.');
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
      {/* Encabezado */}
  <header className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center shadow-sm">
  <h1 className="text-3xl font-bold text-blue-800">📍 Resultados Electorales - Catamarca</h1>
  <p className="text-gray-600 mt-2">Consulta por mesa, visualización comparativa y carga institucional.</p>
</header>

      {/* Resumen */}
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

      {/* Buscador */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🔍 Buscar Mesa</h2>
        <FormularioMesa
          mesas={MESAS_CATAMARCA}
          mesaQuery={mesaQuery}
          setMesaQuery={setMesaQuery}
          onSeleccionar={seleccionarSugerencia}
        />
        <button
          onClick={consultarMesa}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Consultar Mesa
        </button>
        {errorMesa && <p className="mt-2 text-red-600">{errorMesa}</p>}
      </div>

      {/* Resultados */}
      {cargandoMesa && <p className="text-blue-600">⏳ Consultando mesa...</p>}
      {resultadosMesa && <ResultadosMesa resultados={resultadosMesa} />}

      {/* Acciones */}
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
