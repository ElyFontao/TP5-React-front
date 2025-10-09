// src/components/ResultadoFila.jsx
import { useNavigate } from 'react-router-dom';
import { useResultados } from '../context/ResultadosContext';
import Swal from 'sweetalert2'; 

const ResultadoFila = ({ resultado }) => {
  const navigate = useNavigate();
  const { eliminarResultado } = useResultados();

  const handleEliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el resultado de ${resultado.nombrePartido} en la Mesa ${resultado.mesaId}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((res) => {
      if (res.isConfirmed) {
        // Llama a la función de eliminación del Context
        eliminarResultado(resultado.id); 
      }
    });
  };

  return (
    <tr className="border-b hover:bg-gray-100 transition duration-150">
      <td className="py-3 px-6 text-left whitespace-nowrap font-medium text-gray-700">
        {resultado.nombrePartido}
      </td>
      <td className="py-3 px-6 text-center text-gray-700">
        {resultado.votos ? resultado.votos.toLocaleString('es-AR') : '0'}
      </td>
      <td className="py-3 px-6 text-center text-gray-700">
        {resultado.porcentaje ? `${resultado.porcentaje}%` : 'N/A'}
      </td>
      <td className="py-3 px-6 text-center text-gray-700">
        C: {resultado.circuitoId} / M: {resultado.mesaId}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center space-x-2">
          
          <button 
            onClick={() => navigate(`/items/${resultado.id}`)}
            className="text-blue-600 hover:text-blue-900 transition duration-150 font-semibold"
            title="Ver Detalle"
          >
            Ver
          </button>
          
          <button 
            onClick={() => navigate(`/items/${resultado.id}/edit`)}
            className="text-green-600 hover:text-green-900 transition duration-150 font-semibold"
            title="Editar Resultado"
          >
            Editar
          </button>

          <button 
            onClick={handleEliminar}
            className="text-red-600 hover:text-red-900 transition duration-150 font-semibold"
            title="Eliminar Resultado"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ResultadoFila;