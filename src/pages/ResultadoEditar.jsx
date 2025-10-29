// src/pages/ResultadoEditar.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResultados } from '../context/ResultadosContext';
import ResultadoFormulario from '../components/ResultadoFormulario';
import resultadosApi from '../api/resultadosApi';

// 🚨 Define la ruta del recurso de MockAPI (esto va ANTES del ID)
const RUTA_RECURSO = '/resultados'; // Asegúrate que sea '/nacional' o '/resultados' si lo cambiaste

const ResultadoEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { actualizarResultado } = useResultados();
    
    const [datosResultado, setDatosResultado] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // 2. Precarga: Obtener el recurso completo para editar
    useEffect(() => {
        const obtenerResultado = async () => {
            try {
                setCargando(true);
                // Construcción de la URL: /api/RECURSO/ID
                const response = await resultadosApi.get(`${RUTA_RECURSO}/${id}`); 
                setDatosResultado(response.data);
            } catch (err) {
                console.error("Error al cargar datos para edición:", err);
                setError("No se pudo cargar el resultado con ese ID.");
            } finally {
                setCargando(false);
            }
        };

        obtenerResultado();
    }, [id]);

    // 3. Manejador del PUT
    const handleEditar = async (data) => {
        try {
            const datosAEnviar = {
                ...data,
                
                actualizacion: new Date().toISOString(),
            }
            
            await actualizarResultado(id, datosAEnviar); 
            
            // 🚨 CORRECCIÓN FINAL: Navega a la ruta de listado correcta: '/item'
            navigate('/items'); 
        } catch (error) {
            console.error("Fallo al actualizar el resultado.", error);
        }
    };

    // --- Renderizado de Estados ---
    if (cargando) {
        return <div className="text-center p-10 text-xl text-blue-600">Cargando datos para edición...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-xl text-red-600">{error}</div>;
    }
    
    // 4. Renderiza el formulario si los datos están listos
    return (
       <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
    ✏️ Editar Resultado Electoral Mesa Testigo ({id})
  </h1>
            <ResultadoFormulario 
                resultadoAEditar={datosResultado}
                onSubmit={handleEditar} 
                esEdicion={true} 
            />
        </div>
    );
};

export default ResultadoEditar;