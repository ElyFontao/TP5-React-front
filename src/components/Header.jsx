import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
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

const Navbar = () => {
  const [rolUsuario, setRolUsuario] = useState('consulta');
  const [bloqueado, setBloqueado] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-150'
      : 'text-gray-300 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150';

  const getRoleButtonClass = (role) =>
    rolUsuario === role
      ? 'bg-blue-600 text-white font-bold'
      : 'bg-gray-700 text-gray-300 hover:bg-gray-600';

  const cambiarRol = (nuevoRol) => {
    setBloqueado(true);
    setRolUsuario(nuevoRol);
    setTimeout(() => setBloqueado(false), 3000);
  };

  const toggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-[#103693] dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Encabezado superior */}
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

          {/* Botón hamburguesa */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="text-white md:hidden"
            aria-label="Abrir menú"
          >
            {menuAbierto ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú desplegable */}
        <div
          className={`mt-6 md:mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-300 ${
            menuAbierto ? 'block' : 'hidden md:flex'
          }`}
        >
          {/* Navegación principal */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <NavLink to="/" className={getNavLinkClass}>
              <div className="flex items-center gap-1">
                <HomeIcon className="w-4 h-4" />
                <span>Inicio</span>
              </div>
            </NavLink>

            <NavLink to="/nacional" className={getNavLinkClass}>
              <div className="flex items-center gap-1">
                <ChartBarIcon className="w-4 h-4" />
                <span>Vista Nacional</span>
              </div>
            </NavLink>

            {rolUsuario === 'delegado' && (
              <NavLink to="/items" className={getNavLinkClass}>
                <div className="flex items-center gap-1">
                  <ClipboardDocumentCheckIcon className="w-4 h-4" />
                  <span>Mesas Testigo</span>
                </div>
              </NavLink>
            )}
          </div>

          {/* Controles de rol y tema */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <LockClosedIcon className="w-4 h-4 text-yellow-400" />
              <span>Rol:</span>
              <span className="font-semibold capitalize text-white">{rolUsuario}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => cambiarRol('consulta')}
                className={`py-1 px-3 rounded-md text-xs ${getRoleButtonClass('consulta')}`}
              >
                Consulta
              </button>
              <button
                onClick={() => cambiarRol('delegado')}
                className={`py-1 px-3 rounded-md text-xs ${getRoleButtonClass('delegado')}`}
              >
                Delegado
              </button>
            </div>

            {/* Modo oscuro al final */}
            <button
              onClick={toggleModoOscuro}
              className="text-gray-300 hover:text-white transition"
              title="Alternar modo claro/oscuro"
            >
              {modoOscuro ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mensaje de restricción */}
        {bloqueado && (
          <div className="mt-6 text-center text-sm text-yellow-300 bg-gray-700 py-2 rounded">
            ⚠️ Cambio de rol bloqueado. Esta función requiere autenticación.
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
