import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import axios from 'axios';

const PanelAdmin = () => {
  const { usuario } = useAuth();

  // 📦 Estados locales
  const [fiscales, setFiscales] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', email: '', password: '' });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // 🔐 Instancia de API autenticada
  const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      Authorization: `Bearer ${usuario?.token}`,
      'Content-Type': 'application/json'
    }
  });

  // 🔁 Cargar fiscales al montar
  const cargarFiscales = async () => {
    try {
      const res = await api.get('/usuarios/fiscales');
      setFiscales(res.data);
    } catch (err) {
      setError('❌ Error al cargar fiscales');
    }
  };

  useEffect(() => {
    if (usuario?.token) cargarFiscales();
  }, [usuario]);

  // ✅ Crear nuevo fiscal
  const crearFiscal = async () => {
    if (!nuevo.nombre || !nuevo.email || !nuevo.password) {
      setError('⚠️ Todos los campos son obligatorios');
      return;
    }

    setCargando(true);
    setError('');
    setMensaje('');

    try {
      await api.post('/usuarios/fiscales', nuevo);
      setNuevo({ nombre: '', email: '', password: '' });
      setMensaje('✅ Fiscal creado correctamente');
      cargarFiscales();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('⚠️ Ya existe un usuario con ese email');
      } else {
        setError('❌ Error al crear fiscal');
      }
    } finally {
      setCargando(false);
    }
  };

  // 🗑️ Eliminar fiscal
  const eliminarFiscal = async (id) => {
    if (!window.confirm('¿Eliminar este fiscal?')) return;

    try {
      await api.delete(`/usuarios/fiscales/${id}`);
      setMensaje('🗑️ Fiscal eliminado');
      cargarFiscales();
    } catch (err) {
      setError('❌ Error al eliminar fiscal');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl space-y-8">
      {/* 🧭 Título institucional */}
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 border-b pb-2">
        ⚙️ Gestión de Fiscales
      </h2>

      {/* 📣 Mensajes */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-l-4 border-red-500 p-3 rounded">
          {error}
        </div>
      )}
      {mensaje && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-l-4 border-green-500 p-3 rounded">
          {mensaje}
        </div>
      )}

      {/* 📝 Formulario de alta */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nombre</label>
          <input
            type="text"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            value={nuevo.email}
            onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
            className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Contraseña</label>
          <input
            type="password"
            value={nuevo.password}
            onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })}
            className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-2"
          />
        </div>
        <div>
          <button
            onClick={crearFiscal}
            disabled={cargando}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow transition duration-300 disabled:opacity-50"
          >
            {cargando ? 'Creando...' : 'Crear Fiscal'}
          </button>
        </div>
      </div>

      {/* 📋 Listado de fiscales */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner p-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Fiscales Registrados
        </h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {fiscales.map((fiscal) => (
            <li key={fiscal._id} className="flex justify-between items-center py-2">
              <span className="text-gray-800 dark:text-gray-100">
                {fiscal.nombre} <span className="text-sm text-gray-500">({fiscal.email})</span>
              </span>
              <button
                onClick={() => eliminarFiscal(fiscal._id)}
                className="text-red-600 dark:text-red-400 hover:underline font-medium"
              >
                Eliminar
              </button>
            </li>
          ))}
          {fiscales.length === 0 && (
            <li className="text-gray-500 dark:text-gray-400 py-2">No hay fiscales registrados.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PanelAdmin;
