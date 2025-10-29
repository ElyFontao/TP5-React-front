// 📁 src/pages/ResultadoCrear.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 🎯 Importamos el contexto para acceder a la función de creación y posibles errores
import { useResultados } from '../context/ResultadosContext';
// 🧾 Componente del formulario institucional
import ResultadoFormulario from '../components/ResultadoFormulario';

const ResultadoCrear = () => {
  const navigate = useNavigate();

  // 📦 Estado de carga local para mostrar spinner o deshabilitar el formulario
  const [loading, setLoading] = useState(false);

  // 🧠 Obtenemos la función de creación y el error desde el contexto
  const { crearResultado, error: apiError } = useResultados();

  // ✅ Función que se ejecuta al enviar el formulario
  const handleCrear = async (data) => {
    setLoading(true); // ⏳ Activamos estado de carga

    const exito = await crearResultado(data); // 📨 Enviamos los datos al backend

    setLoading(false); // ✅ Terminó la carga

    if (exito) {
      navigate('/items'); // 🧭 Redirigimos al listado si fue exitoso
    }
    // ⚠️ Si hubo error, el contexto ya lo muestra en apiError
  };

  // ❌ Función que se ejecuta al hacer clic en "Cancelar"
  const handleCancelar = () => {
    const confirmar = window.confirm('¿Seguro que querés cancelar la carga? Los datos no se guardarán.');
    if (confirmar) {
      navigate('/items'); // 🧭 Redirige al listado
    }
  };

  return (
    <div className="p-4 md:p-8">
{/* 🧭 Título institucional */}
<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
  ➕ Cargar Nueva Mesa Testigo
</h1>

      {/* 🚨 Mensaje de error si la API devuelve duplicado u otro fallo */}
      {apiError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 font-bold" role="alert">
          {apiError}
        </div>
      )}

      {/* 🧾 Formulario institucional con props */}
      <ResultadoFormulario 
        onSubmit={handleCrear}        // ✅ Función para guardar
        onCancel={handleCancelar}     // ❌ Función para cancelar con confirmación
        esEdicion={false}             // 🆕 Modo creación
        disabled={loading}            // ⏳ Deshabilita si está cargando
      />

      {/* ⏳ Indicador de carga */}
      {loading && (
        <div className="text-center mt-4 p-2 text-blue-600 font-semibold">
          Registrando mesa... Por favor espere.
        </div>
      )}
    </div>
  );
};

export default ResultadoCrear;
