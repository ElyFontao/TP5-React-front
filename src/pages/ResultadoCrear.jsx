// src/pages/ResultadoCrear.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos el error del contexto para mostrar mensajes de duplicado o API
import { useResultados } from '../context/ResultadosContext'; 
import ResultadoFormulario from '../components/ResultadoFormulario';

const ResultadoCrear = () => {
  const navigate = useNavigate();
  // Obtener la función, y el estado de error del contexto
  const { crearResultado, error: apiError } = useResultados(); 
  const [loading, setLoading] = useState(false); // Estado de carga local

  const handleCrear = async (data) => {
    // La data ya incluye 'actualizacion' y las validaciones del formulario.
    
    setLoading(true);
    
    // 1. Llama a la función del Contexto. Esperamos un booleano (true=éxito, false=fallo).
    const exito = await crearResultado(data);
    
    setLoading(false);

    if (exito) {
      // 2. Si fue exitoso, navegar al listado.
      navigate('/items'); 
    } 
    // Si 'exito' es false, el Contexto ya estableció 'apiError' 
    // con el mensaje de duplicado, y se mostrará en la interfaz.
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        ➕ Cargar Nueva Mesa Testigo
      </h1>
      
      {/* 🚨 Mostrar el error de duplicado (si existe) desde el Contexto */}
      {apiError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 font-bold" role="alert">
              {apiError}
          </div>
      )}
      
      <ResultadoFormulario 
        onSubmit={handleCrear} 
        esEdicion={false} 
        // Opcional: Deshabilitar el formulario mientras se carga
        disabled={loading} 
      />
      
      {loading && (
          <div className="text-center mt-4 p-2 text-blue-600 font-semibold">
              Registrando mesa... Por favor espere.
          </div>
      )}
    </div>
  );
};

export default ResultadoCrear;