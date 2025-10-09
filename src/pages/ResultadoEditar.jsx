// src/pages/ResultadoEditar.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResultados } from '../context/ResultadosContext';
import ResultadoFormulario from '../components/ResultadoFormulario';
import resultadosApi from '../api/resultadosApi'; // Importa la instancia de Axios

const ResultadoEditar = () => {
  const { id } = useParams(); // 1. Obtiene el ID de la URL
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
        // GET directo al API para obtener los datos
        const response = await resultadosApi.get(`/${id}`); 
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
          id: id, 
          // Actualizamos la marca de tiempo
          actualizacion: new Date().toISOString(), 
      }
      
      // Llama a la función PUT del Contexto
      await actualizarResultado(id, datosAEnviar); 
      navigate('/items'); // Navega de vuelta al listado
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
    <div className="p-4 md:p-8">
      <ResultadoFormulario 
        resultadoAEditar={datosResultado} // Precarga los datos
        onSubmit={handleEditar} 
        esEdicion={true} 
      />
    </div>
  );
};

export default ResultadoEditar;