// src/App.jsx
import { useState } from 'react';
import { RutasPrincipales } from './Router/RutasPrincipales.jsx';

function App() {
  // 🔐 Estado global del rol de usuario
  const [rolUsuario, setRolUsuario] = useState('consulta'); // 'consulta' o 'delegado'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Pasamos el rol y el setter a las rutas */}
      <RutasPrincipales rolUsuario={rolUsuario} setRolUsuario={setRolUsuario} />
    </div>
  );
}

export default App;
