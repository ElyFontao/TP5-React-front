import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('usuario');
    if (stored) setUsuario(JSON.parse(stored));
  }, []);

  const login = async (credenciales) => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });

      const data = await res.json();
      if (data.token && data.usuario) {
        const user = {
          token: data.token,
          nombre: data.usuario.nombre,
          rol: data.usuario.rol,
          email: data.usuario.email
        };
        setUsuario(user);
        localStorage.setItem('usuario', JSON.stringify(user));
        return user; // ✅ devolvemos el usuario directamente
      }
      return null;
    } catch (error) {
      console.error('❌ Error en login:', error.message);
      return null;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
