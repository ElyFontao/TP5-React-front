// src/Router/RutasPrincipales.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes de Página
import Header from '../components/Header'; 
import Home from '../pages/Home.jsx';
import ResultadoListado from '../pages/ResultadoListado.jsx';
import ResultadoDetalle from '../pages/ResultadoDetalle.jsx';
import ResultadoCrear from '../pages/ResultadoCrear.jsx';
import ResultadoEditar from '../pages/ResultadoEditar.jsx';
import NoEncontrado from '../pages/NoEncontrado.jsx';
import VistaNacional from '../pages/VistaNacional.jsx'; 
import VistaComparativa from '../pages/VistaComparativa.jsx';

// 🚨 CAMBIO CLAVE: Recibe rolUsuario y setRolUsuario como props
export const RutasPrincipales = ({ rolUsuario, setRolUsuario }) => {
  return (
    <BrowserRouter>
      {/* Header puede recibir setRolUsuario si querés cambiar el rol desde ahí */}
      <Header rolUsuario={rolUsuario} setRolUsuario={setRolUsuario} />

      <Routes>
        {/* Página principal con control de visibilidad por rol */}
        <Route path="/" element={<Home rolUsuario={rolUsuario} />} />

        {/* Vista Nacional (siempre accesible) */}
        <Route path="/nacional" element={<VistaNacional rolUsuario={rolUsuario} />} />

        {/* Comparativa (puede condicionar acceso más adelante) */}
        <Route path="/comparativa" element={<VistaComparativa rolUsuario={rolUsuario} />} />
        <Route path="/mesa/:mesaId/:circuitoId/:seccionId/comparativa" element={<VistaComparativa rolUsuario={rolUsuario} />} />

        {/* CRUD (solo para rol delegado, puede protegerse más adelante) */}
        <Route path="/items" element={<ResultadoListado rolUsuario={rolUsuario} />} />
        <Route path="/items/create" element={<ResultadoCrear rolUsuario={rolUsuario} />} />
        <Route path="/items/:id" element={<ResultadoDetalle rolUsuario={rolUsuario} />} />
        <Route path="/items/edit/:id" element={<ResultadoEditar rolUsuario={rolUsuario} />} />

        {/* Página 404 */}
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
};
