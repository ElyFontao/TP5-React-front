// src/main.jsx (Versión correcta para el proyecto CRUD Electoral)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Importa Toastify y su CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 2. Importa tu Context Provider (el que maneja los resultados electorales)
import { ResultadosProvider } from './context/ResultadosContext.jsx'; // ¡CORREGIDO!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResultadosProvider> 
      <App />
      {/* Configuración de Toastify */}
      <ToastContainer position="top-right" autoClose={3000} />
    </ResultadosProvider>
  </React.StrictMode>,
);