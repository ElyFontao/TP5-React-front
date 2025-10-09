// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 mt-12 text-center bg-white rounded-xl shadow-2xl">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Sistema de Gestión Electoral
      </h1>
      <h2 className="text-2xl font-semibold text-blue-600 mb-8">
        Mesa de Control - Provincia de Catamarca
      </h2>
      
      <p className="text-gray-700 mb-10 text-lg leading-relaxed">
        Utilice las herramientas a continuación para consultar los datos electorales globales de la API Nacional simulada o para gestionar y auditar los resultados de las mesas testigo (CRUD).
      </p>

      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
        
        <Link 
          to="/nacional"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Ver Resumen Nacional (API)
        </Link>
        
        <Link 
          to="/items"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Ir al Control de Mesas (CRUD)
        </Link>
        
      </div>
    </div>
  );
};

export default Home;