// src/pages/ResultadoCrear.jsx
import { useNavigate } from 'react-router-dom';
import { useResultados } from '../context/ResultadosContext';
import ResultadoFormulario from '../components/ResultadoFormulario';

const ResultadoCrear = () => {
  const navigate = useNavigate();
  const { crearResultado } = useResultados();

  const handleCrear = async (data) => {
    try {
      // 1. Añadir el campo de actualización (timestamp) antes de enviar
      const datosAEnviar = {
          ...data,
          actualizacion: new Date().toISOString(),
      }
      
      // 2. Llama a la función del Contexto para hacer el POST
      await crearResultado(datosAEnviar);
      
      // 3. Navegación programática al listado
      navigate('/items'); 
    } catch (error) {
      // El error ya es manejado y notificado por Toastify en el Contexto
      console.error("Fallo al crear el resultado.", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <ResultadoFormulario 
        onSubmit={handleCrear} 
        esEdicion={false} 
      />
    </div>
  );
};

export default ResultadoCrear;