import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 1. Cargar Usuarios de localStorage al inicio
  const [usuarios, setUsuarios] = useState(() => {
    const storedUsers = localStorage.getItem('usuariosApp');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  // 2. Estado para el usuario logueado
  const [user, setUser] = useState(null); // ✅ Renombrado para consistencia

  // 3. Guardar Usuarios en localStorage cada vez que la lista cambia
  useEffect(() => {
    localStorage.setItem('usuariosApp', JSON.stringify(usuarios));
  }, [usuarios]);

  // 4. FUNCIÓN DE REGISTRO
  const createAccount = (newUserData) => {
    const userExists = usuarios.some(u => u.email === newUserData.email);
    if (userExists) {
      return { success: false, message: "El email ya está registrado." };
    }

    const newUser = { id: Date.now(), ...newUserData };
    setUsuarios(prev => [...prev, newUser]);
    return { success: true, message: "Cuenta creada con éxito." };
  };

  // 5. FUNCIÓN DE LOGIN
  const login = (email, password) => {
    const foundUser = usuarios.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: "Inicio de sesión exitoso.", user: foundUser };
    }
    return { success: false, message: "Credenciales inválidas." };
  };

  // 6. FUNCIÓN DE LOGOUT
  const logout = () => {
    setUser(null);
  };

  // 7. Valor del contexto
  const value = {
    user,           // ✅ Renombrado
    createAccount,
    login,
    logout          // ✅ Agregado
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
