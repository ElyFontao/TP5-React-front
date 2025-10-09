// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Mesas Testigo (CRUD)', path: '/items' },
  { name: 'Vista Nacional (API)', path: '/nacional' },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Nombre de la App */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition duration-300">
              🗳️ Elecciones Catamarca
            </Link>
          </div>

          {/* Enlaces de Navegación */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                // Determina si el enlace está activo
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition duration-300
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
          
          {/* Aquí podrías añadir un botón de usuario/ajustes si fuera necesario */}
          <div className="hidden md:block">
              <span className="text-sm text-gray-500">v1.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;