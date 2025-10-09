// src/Router/RutasPrincipales.jsx (Contenido FINAL)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa los componentes de Página
import Header from '../components/Header'; 
import Home from '../pages/Home.jsx';
import ResultadoListado from '../pages/ResultadoListado.jsx';
import ResultadoDetalle from '../pages/ResultadoDetalle.jsx';
import ResultadoCrear from '../pages/ResultadoCrear.jsx';
import ResultadoEditar from '../pages/ResultadoEditar.jsx';
import NoEncontrado from '../pages/NoEncontrado.jsx';
// 🚨 Nueva importación
import VistaNacional from '../pages/VistaNacional.jsx'; 

// 🚨 CAMBIO CLAVE: Usamos el nuevo nombre y "export const"
export const RutasPrincipales = () => {
  return (
    <BrowserRouter>
      <Header /> 
      
      <Routes>
        {/* Ruta Principal */}
        <Route path="/" element={<Home />} />
         {/* 🚨 Nueva Ruta de la API Nacional */}
        <Route path="/nacional" element={<VistaNacional />} /> 
        
        {/* Rutas CRUD */}
        <Route path="/items" element={<ResultadoListado />} /> 
        <Route path="/items/create" element={<ResultadoCrear />} />
        
        {/* Rutas Dinámicas (usan :id) */}
        <Route path="/items/:id" element={<ResultadoDetalle />} /> 
        <Route path="/items/:id/edit" element={<ResultadoEditar />} />

        {/* Ruta Catch-all (404) */}
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
};