// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * Componente de Barra de Navegación (Navbar).
 * Incluye la navegación principal y simula el control de acceso
 * basado en el rol de usuario (Consulta vs. Delegado Partidario).
 */
const Navbar = () => {
    // 🚨 1. SIMULACIÓN DE ROL: 
    // Usamos useState para guardar el rol activo. Por defecto, es 'consulta'.
    // Los posibles valores son: 'consulta' (usuario público) o 'delegado' (acceso CRUD).
    const [rolUsuario, setRolUsuario] = useState('consulta'); 

    // Función auxiliar para generar un enlace (NavLink) estilizado
    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? 'text-white bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150';

    // Función auxiliar para generar las clases del botón de rol
    const getRoleButtonClass = (role) =>
        rolUsuario === role
            ? 'bg-blue-600 text-white font-bold'
            : 'bg-gray-700 text-gray-400 hover:bg-gray-600';

    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logotipo y Título de la App */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 text-xl font-extrabold text-white">
                            🗳️ Elecciones Catamarca
                        </Link>
                    </div>

                    {/* Enlaces de Navegación Central */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            
                            {/* Enlace Inicio (Siempre visible) */}
                            <NavLink to="/" className={getNavLinkClass}>
                                Inicio
                            </NavLink>

                            {/* Enlace a Vista Nacional (Siempre visible - API de Consulta) */}
                            <NavLink to="/nacional" className={getNavLinkClass}>
                                Vista Nacional (API)
                            </NavLink>

                            {/* 🚨 2. CONTROL DE VISIBILIDAD BASADO EN ROL (CRUD) */}
                            {/* El enlace al CRUD solo se muestra si el rol es 'delegado' */}
                            {rolUsuario === 'delegado' && (
                                <NavLink to="/items" className={getNavLinkClass}>
                                    Mesas Testigo (CRUD)
                                </NavLink>
                            )}

                        </div>
                    </div>

                    {/* Simulación de Autenticación y Rol (Extremo Derecho) */}
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-400 hidden sm:block">
                            Rol Activo: <span className="font-semibold capitalize text-blue-300">{rolUsuario}</span>
                        </span>
                        
                        {/* Botones para cambiar el rol y probar la visibilidad */}
                        <button
                            onClick={() => setRolUsuario('consulta')}
                            className={`py-1 px-3 rounded-md text-xs transition duration-150 ${getRoleButtonClass('consulta')}`}
                            title="Simular acceso de usuario de consulta (solo lectura)"
                        >
                            Consulta
                        </button>
                        <button
                            onClick={() => setRolUsuario('delegado')}
                            className={`py-1 px-3 rounded-md text-xs transition duration-150 ${getRoleButtonClass('delegado')}`}
                            title="Simular acceso de delegado partidario (acceso CRUD)"
                        >
                            Delegado
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;