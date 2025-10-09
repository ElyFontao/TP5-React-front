// src/pages/Home.jsx
import { Link } from 'react-router-dom';

/**
 * Componente principal de la aplicación (Landing Page).
 * Esta vista presenta la aplicación y sirve como centro de navegación
 * hacia las dos funcionalidades principales: la consulta de datos (API) 
 * y la gestión de mesas testigo (CRUD).
 */
const Home = () => {
    return (
        // Contenedor principal: Centrado, con ancho limitado y un fondo suave para destacar el contenido.
        <div className="max-w-4xl mx-auto p-8 mt-16 text-center bg-white rounded-2xl shadow-xl border-t-4 border-blue-600">
            
            {/* Título principal de la aplicación */}
            <h1 className="text-6xl font-black text-gray-900 mb-2">
                Sistema Electoral
            </h1>
            
            {/* Subtítulo enfocado en la localización y función */}
            <h2 className="text-2xl font-light text-blue-700 mb-8 tracking-wide">
                Mesa de Control | Catamarca
            </h2>
            
            {/* Descripción del propósito de la aplicación */}
            <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                Esta herramienta le permite tanto consultar los resultados consolidados (simulando una API nacional) como gestionar y auditar los datos de las mesas testigo registradas (CRUD).
            </p>

            {/* Contenedor de botones de navegación: Flex layout para centrar y espaciar */}
            <div className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-8">
                
                {/* 1. Botón para la Vista Nacional (Lectura/API) */}
                <Link 
                    to="/nacional"
                    className="
                        bg-blue-600 hover:bg-blue-800 text-white font-semibold 
                        py-4 px-8 rounded-full shadow-lg transition duration-300 
                        transform hover:scale-105 hover:shadow-xl
                    "
                >
                    📊 Resumen Nacional (API)
                </Link>
                
                {/* 2. Botón para el CRUD de Mesas Testigo (Delegado/CRUD) */}
                <Link 
                    to="/items"
                    className="
                        bg-green-600 hover:bg-green-800 text-white font-semibold 
                        py-4 px-8 rounded-full shadow-lg transition duration-300 
                        transform hover:scale-105 hover:shadow-xl
                    "
                >
                    📝 Control de Mesas (CRUD)
                </Link>
                
            </div>
        </div>
    );
};

export default Home;