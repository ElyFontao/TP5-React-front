// src/Router/RutasPrincipales.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import ProtectedRoute from '../auth/ProtectedRoute';


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
import PanelAdmin from '../pages/PanelAdmin.jsx';
import Login from '../pages/Login.jsx'; // al inicio del archivo
import NoAutorizado from '../pages/NoAutorizado.jsx';

export const RutasPrincipales = () => {
  const { usuario } = useAuth(); // 🔐 Accede al usuario y rol desde el contexto

  return (
    <BrowserRouter>
      {/* Header puede mostrar el rol si lo necesitás */}
      <Header rolUsuario={usuario?.rol} />

      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Página principal: accesible para todos los roles */}
        <Route path="/" element={<Home rolUsuario={usuario?.rol} />} />

        {/* Vista Nacional: accesible para todos */}
        <Route path="/nacional" element={<VistaNacional rolUsuario={usuario?.rol} />} />

        {/* Comparativa: accesible para todos */}
        <Route path="/comparativa" element={<VistaComparativa rolUsuario={usuario?.rol} />} />
        <Route path="/mesa/:mesaId/:circuitoId/:seccionId/comparativa" element={<VistaComparativa rolUsuario={usuario?.rol} />} />

        {/* CRUD: solo para  fiscal */}
        <Route
          path="/items"
          element={
            <ProtectedRoute roles={['fiscal']}>
              <ResultadoListado rolUsuario={usuario?.rol} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items/create"
          element={
            <ProtectedRoute roles={['fiscal']}>
              <ResultadoCrear rolUsuario={usuario?.rol} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items/:id"
          element={
            <ProtectedRoute roles={[ 'fiscal']}>
              <ResultadoDetalle rolUsuario={usuario?.rol} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items/edit/:id"
          element={
            <ProtectedRoute roles={['fiscal']}>
              <ResultadoEditar rolUsuario={usuario?.rol} />
            </ProtectedRoute>
          }
        />
<Route
  path="/admin"
  element={
    <ProtectedRoute roles={['admin']}>
      <PanelAdmin />
    </ProtectedRoute>
  }
/>
<Route path="/unauthorized" element={<NoAutorizado />} />
        {/* Página 404 */}
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
};
