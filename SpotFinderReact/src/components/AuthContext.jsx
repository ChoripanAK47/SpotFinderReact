import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // URL base del backend (Asegúrate de que tu backend esté corriendo en este puerto)
  const API_URL = "http://localhost:8080/api/v1/usuarios";

  // 1. FUNCIÓN DE REGISTRO (Conectada al Backend)
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
      console.error("Error en la función createAccount:", error);
      return { success: false, message: "Error de conexión con el servidor." };
    }
  };

  // 2. FUNCIÓN DE LOGIN (Conectada al Backend)
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
          // Guardar token
          localStorage.setItem('token', data.token);
          setToken(data.token);

          // Como el endpoint de login solo devuelve el token, simulamos los datos básicos
          // del usuario para que la UI no se rompa. 
          // Crear un endpoint /me para traer los datos completos.
          setUser({ 
            email: email, 
            nombre: "", 
            apellido: "", 
            genero: "" 
          });

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
    createAccount,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};