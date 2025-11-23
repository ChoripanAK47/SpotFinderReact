import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true); // Para saber si estamos verificando sesión

  // URL base del backend (Asegúrate de que tu backend esté corriendo en este puerto)
  // const API_URL = "http://localhost:8080/api/v1/usuarios";
  const API_URL = "http://18.212.90.206:8080/api/v1/usuarios";

  const fetchUserProfile = async (tokenToUse) => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToUse}`, // Enviamos el token
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // userData debe coincidir con el DTO UsuarioProfile del backend:
        // { id, nombre, apellido, email, rol, genero }
        setUser(userData); 
      } else {
        // Si el token expiró o no es válido
        console.warn("Token inválido o expirado.");
        logout();
      }
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // --- EFECTO: Cargar usuario al iniciar la app si hay token ---
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // 1. FUNCIÓN DE REGISTRO
  const createAccount = async (userData) => {
    try {
      const payload = {
        nombre: userData.nombre.trim(),
        apellido: userData.apellido.trim(),
        email: userData.email,
        contrasena: userData.password,
        genero: userData.genero
      };

      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        return { success: false, message: errorText || "Error al crear la cuenta." };
      }

      return { success: true, message: "Cuenta creada con éxito." };
    } catch (error) {
      console.error("Error en createAccount:", error);
      return { success: false, message: "Error de conexión con el servidor." };
    }
  };

  // 2. FUNCIÓN DE LOGIN (Actualizada)
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Esperamos { "token": "..." }
        
        if (data.token) {
          // 1. Guardar token
          localStorage.setItem('token', data.token);
          setToken(data.token);

          // 2. Obtener datos reales del usuario inmediatamente
          await fetchUserProfile(data.token);

          return { success: true, message: "Inicio de sesión exitoso." };
        }
      }
      
      return { success: false, message: "Credenciales inválidas." };
      
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Error de conexión con el servidor." };
    }
  };

  // 3. FUNCIÓN DE LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    createAccount,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};