// src/components/ResultadoFormulario.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Componente auxiliar para un campo de input con validación
const CampoFormulario = ({ label, name, type = 'text', register, error, options = {} }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      // Se utiliza el hook register para enlazar el input con react-hook-form
      {...register(name, options)} 
      className={`mt-1 block w-full rounded-md border p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="mt-1 text-sm text-red-600 font-medium">{error.message}</p>}
  </div>
);

// Formulario Principal
const ResultadoFormulario = ({ resultadoAEditar, onSubmit, esEdicion }) => {
  const navigate = useNavigate();

  // 1. Configuración de react-hook-form con valores por defecto (precarga para edición)
  const { register, handleSubmit, formState: { errors } } = useForm({
    // Si existe resultadoAEditar, lo usa; si no, usa un objeto vacío con valores predeterminados
    defaultValues: resultadoAEditar || {
      nombrePartido: '',
      votos: 0,
      porcentaje: 0,
      circuitoId: '', 
      mesaId: '',    
    },
  });

  const handleEnvioFormulario = (data) => {
    // Aseguramos que los campos numéricos se envíen como números
    data.votos = Number(data.votos);
    data.porcentaje = Number(data.porcentaje);
    onSubmit(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {esEdicion ? '✏️ Editar Resultado de Mesa' : '➕ Registrar Nuevo Resultado'}
      </h2>
      <form onSubmit={handleSubmit(handleEnvioFormulario)}>
        
        {/* Campo: Nombre del Partido */}
        <CampoFormulario
            label="Nombre del Partido"
            name="nombrePartido"
            register={register}
            error={errors.nombrePartido}
            options={{ required: "El nombre del partido es obligatorio" }}
        />
        
        <div className="grid grid-cols-2 gap-4">
            {/* Campo: Votos */}
            <CampoFormulario
                label="Votos"
                name="votos"
                type="number"
                register={register}
                error={errors.votos}
                options={{ 
                    required: "La cantidad de votos es obligatoria", 
                    min: { value: 0, message: "No puede ser negativo" }, 
                    valueAsNumber: true 
                }}
            />
            {/* Campo: Porcentaje */}
            <CampoFormulario
                label="Porcentaje (%)"
                name="porcentaje"
                type="number"
                register={register}
                error={errors.porcentaje}
                options={{ 
                    required: "El porcentaje es obligatorio", 
                    min: { value: 0, message: "Mínimo 0" }, 
                    max: { value: 100, message: "Máximo 100" }, 
                    valueAsNumber: true 
                }}
            />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            {/* Campo: Circuito ID */}
            <CampoFormulario
                label="ID de Circuito"
                name="circuitoId"
                register={register}
                error={errors.circuitoId}
                options={{ required: "El circuito es obligatorio" }}
            />
            {/* Campo: Mesa ID */}
            <CampoFormulario
                label="ID de Mesa"
                name="mesaId"
                register={register}
                error={errors.mesaId}
                options={{ required: "La mesa es obligatoria" }}
            />
        </div>

        {/* Botones de Acción */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/items')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {esEdicion ? '💾 Guardar Cambios' : '🚀 Crear Resultado'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResultadoFormulario;