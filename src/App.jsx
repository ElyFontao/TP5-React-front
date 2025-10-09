// src/App.jsx (Contenido FINAL)

// 🚨 CAMBIO CLAVE: Nueva ruta y nueva importación nombrada
import { RutasPrincipales } from './Router/RutasPrincipales.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Usamos el nuevo nombre del componente */}
      <RutasPrincipales /> 
    </div>
  );
}

export default App;