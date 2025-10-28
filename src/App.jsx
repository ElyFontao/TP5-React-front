// src/App.jsx
import { AuthProvider } from './auth/AuthContext';
import { RutasPrincipales } from './Router/RutasPrincipales.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <RutasPrincipales />
      </div>
    </AuthProvider>
  );
}

export default App;
