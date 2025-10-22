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
import VistaNacional from '../pages/VistaNacional.jsx'; 
import VistaComparativa from '../pages/VistaComparativa.jsx';

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
        <Route path="/comparativa" element={<VistaComparativa />} />
        <Route path="/mesa/:mesaId/:circuitoId/:seccionId/comparativa" element={<VistaComparativa />} />

        
        {/* Rutas CRUD */}
        <Route path="/items" element={<ResultadoListado />} /> 
        <Route path="/items/create" element={<ResultadoCrear />} />
        
        {/* Rutas Dinámicas (usan :id) */}
        <Route path="/items/:id" element={<ResultadoDetalle />} /> 
        <Route path="/items/edit/:id" element={<ResultadoEditar />} />

        {/* Ruta Catch-all (404) */}
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
};