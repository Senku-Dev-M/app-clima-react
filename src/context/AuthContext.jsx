import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.access_token) {
      setToken(data.access_token);
      localStorage.setItem('token', data.access_token);
    } else {
      throw new Error(data.message || 'Error al iniciar sesión');
    }
  };

  const register = async (name, email, password) => {
    const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        avatar: 'https://picsum.photos/800',
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Error al registrarse');
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
