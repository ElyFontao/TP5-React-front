import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import axios from 'axios';

const PanelAdmin = () => {
  const { usuario } = useAuth();
  const [fiscales, setFiscales] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', email: '', password: '' });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      Authorization: `Bearer ${usuario?.token}`,
      'Content-Type': 'application/json'
    }
  });

  const cargarFiscales = async () => {
    try {
      const res = await api.get('/usuarios/fiscales');
      setFiscales(res.data);
    } catch (err) {
      setError('Error al cargar fiscales');
    }
  };

  useEffect(() => {
    if (usuario?.token) cargarFiscales();
  }, [usuario]);

  const crearFiscal = async () => {
    if (!nuevo.nombre || !nuevo.email || !nuevo.password) {
      setError('Todos los campos son obligatorios');
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
        setError('Ya existe un usuario con ese email');
      } else {
        setError('Error al crear fiscal');
      }
    } finally {
      setCargando(false);
    }
  };

  const eliminarFiscal = async (id) => {
    if (!window.confirm('¿Eliminar este fiscal?')) return;

    try {
      await api.delete(`/usuarios/fiscales/${id}`);
      setMensaje('🗑️ Fiscal eliminado');
      cargarFiscales();
    } catch (err) {
      setError('Error al eliminar fiscal');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-blue-800">⚙️ Gestión de Fiscales</h2>

      {/* Mensajes */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {mensaje && <div className="text-green-600 mb-4">{mensaje}</div>}

      {/* Formulario */}
      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevo.email}
          onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevo.password}
          onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        />
        <button
          onClick={crearFiscal}
          disabled={cargando}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {cargando ? 'Creando...' : 'Crear Fiscal'}
        </button>
      </div>

      {/* Listado */}
      <ul className="space-y-2">
        {fiscales.map((fiscal) => (
          <li key={fiscal._id} className="flex justify-between items-center border p-2 rounded">
            <span>{fiscal.nombre} ({fiscal.email})</span>
            <button
              onClick={() => eliminarFiscal(fiscal._id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelAdmin;
