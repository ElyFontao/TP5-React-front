import { useAuth } from '../auth/useAuth';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  LockClosedIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import { useState } from 'react';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const rolUsuario = usuario?.rol || 'consulta';

  const [modoOscuro, setModoOscuro] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estilo condicional para enlaces activos
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-150'
      : 'text-gray-300 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150';

  // Alterna modo claro/oscuro
  const toggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);
    document.documentElement.classList.toggle('dark');
  };

  // Íconos personalizados por rol institucional
  const getAvatarUrl = (rol) => {
    switch (rol) {
      case 'admin':
        return 'https://cdn-icons-png.flaticon.com/512/2529/2529645.png';
      case 'fiscal':
        return 'https://cdn-icons-png.flaticon.com/512/1819/1819922.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/2206/2206379.png';
    }
  };

  // Cierre de sesión con redirección
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#103693] dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* 🏛️ Encabezado institucional */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white text-2xl sm:text-3xl font-extrabold tracking-wide">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1455/1455991.png"
              alt="Icono elecciones Catamarca"
              className="w-12 h-12 dark:invert transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
            <span className="whitespace-nowrap">Elecciones Catamarca</span>
          </Link>

          {/* 🍔 Botón hamburguesa para móviles */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="text-white md:hidden"
            aria-label="Abrir menú"
          >
            {menuAbierto ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* 📂 Menú desplegable con navegación y controles */}
        <div
          className={`mt-6 md:mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-300 ${
            menuAbierto ? 'block' : 'hidden md:flex'
          }`}
        >
          {/* 🧭 Navegación principal por rol */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <NavLink to="/" className={getNavLinkClass}>
              <div className="flex items-center gap-1">
                <HomeIcon className="w-4 h-4" />
                <span>Inicio</span>
              </div>
            </NavLink>

            {(rolUsuario === 'admin' || rolUsuario === 'consulta') && (
              <NavLink to="/nacional" className={getNavLinkClass}>
                <div className="flex items-center gap-1">
                  <ChartBarIcon className="w-4 h-4" />
                  <span>Vista Nacional</span>
                </div>
              </NavLink>
            )}

            {(rolUsuario === 'fiscal' || rolUsuario === 'admin') && (
              <NavLink to="/items" className={getNavLinkClass}>
                <div className="flex items-center gap-1">
                  <ClipboardDocumentCheckIcon className="w-4 h-4" />
                  <span>Mesas Testigo</span>
                </div>
              </NavLink>
            )}

            {rolUsuario === 'admin' && (
              <NavLink to="/admin" className={getNavLinkClass}>
                <div className="flex items-center gap-1">
                  <LockClosedIcon className="w-4 h-4" />
                  <span>Gestión de Fiscales</span>
                </div>
              </NavLink>
            )}
          </div>

          {/* 👤 Controles de sesión y tema */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {usuario && (
              <div className="flex items-center gap-3 text-white">
                <img
                  src={getAvatarUrl(usuario.rol)}
                  alt={`Avatar ${usuario.rol}`}
                  className="w-8 h-8 rounded-full border border-white dark:invert"
                />
                <span className="text-sm font-semibold">{usuario.nombre}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                >
                  Cerrar sesión
                </button>
              </div>
            )}

            {/* 🌗 Alternador de modo claro/oscuro */}
            <button
              onClick={toggleModoOscuro}
              className="text-gray-300 hover:text-white transition"
              title="Alternar modo claro/oscuro"
            >
              {modoOscuro ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
