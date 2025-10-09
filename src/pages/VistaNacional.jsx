// src/pages/VistaNacional.jsx
import { useEffect, useState } from 'react';
import nacionalApi from '../api/nacionalApi';
import { useNavigate } from 'react-router-dom';

// La ruta que tu servidor Express (proxy) está escuchando
const RUTA_NACIONAL = '/api/nacional'; 

const VistaNacional = () => {
    const navigate = useNavigate();
    const [datosNacionales, setDatosNacionales] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDatosNacionales = async () => {
            try {
                setCargando(true);
                setError(null);
                
                // 1. Llamada al proxy Express
                const response = await nacionalApi.get(RUTA_NACIONAL);
                
                // 2. Extracción y Verificación de datos
                // La información total está dentro de la propiedad 'estadoRecuento'
                const estadoRecuento = response.data.estadoRecuento;

                // Verificación defensiva contra respuestas vacías o inválidas
                if (!estadoRecuento || typeof estadoRecuento.cantidadVotantes === 'undefined') {
                     throw new Error("La API no devolvió datos de totales válidos en estadoRecuento.");
                }

                // 3. MAPEO DE CAMPOS REALES (basado en tu estructura JSON)
                const datosMapeados = {
                    // Total de votos emitidos (positivos + nulos + blancos)
                    totalVotos: estadoRecuento.cantidadVotantes,
                    
                    // Porcentaje de participación
                    participacion: estadoRecuento.participacionPorcentaje,
                    
                    // Mesas totalizadas
                    mesasReportadas: estadoRecuento.mesasTotalizadas 
                };

                setDatosNacionales(datosMapeados); 
                
            } catch (err) {
                console.error("Error al obtener datos nacionales:", err);
                // Mensaje claro si el proxy falla
                setError("Error: El servidor Proxy de Node.js no está corriendo o falló la conexión con MININTERIOR.");
            } finally {
                setCargando(false);
            }
        };
        fetchDatosNacionales();
    }, []); 

    if (cargando) {
        return <div className="text-center p-10 text-xl text-blue-600">Cargando datos reales de MININTERIOR...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-xl text-red-600">Error: {error}</div>;
    }
    
    if (!datosNacionales || !datosNacionales.totalVotos) {
        return <div className="text-center p-10 text-xl text-gray-600">No se encontraron datos de totales válidos.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-2xl">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 border-b pb-3">
                🌎 Resumen de la API Nacional (Tiempo Real)
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Estos datos son consumidos directamente del servidor del Ministerio del Interior a través de un servidor proxy, evitando problemas de CORS.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                    <p className="text-sm font-medium text-gray-500">Total de Votos (Nacional)</p>
                    <p className="text-3xl font-bold text-blue-900 mt-1">
                        {datosNacionales.totalVotos ? datosNacionales.totalVotos.toLocaleString('es-AR') : 'N/D'}
                    </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg shadow-md border-l-4 border-green-600">
                    <p className="text-sm font-medium text-gray-500">Participación (%)</p>
                    <p className="text-3xl font-bold text-green-900 mt-1">
                        {datosNacionales.participacion ? `${datosNacionales.participacion}%` : 'N/D'}
                    </p>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
                    <p className="text-sm font-medium text-gray-500">Mesas Reportadas</p>
                    <p className="text-3xl font-bold text-yellow-900 mt-1">
                        {datosNacionales.mesasReportadas ? datosNacionales.mesasReportadas.toLocaleString('es-AR') : 'N/D'}
                    </p>
                </div>
                
            </div>
            
            <div className="mt-10 flex justify-end">
                <button
                    onClick={() => navigate('/items')}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Volver al Listado de Mesas Testigo
                </button>
            </div>
        </div>
    );
};

export default VistaNacional;