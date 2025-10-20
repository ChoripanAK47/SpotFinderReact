// src/components/AuthContext.js (o .jsx)

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
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    // 3. Guardar Usuarios en localStorage cada vez que la lista cambia
    useEffect(() => {
        localStorage.setItem('usuariosApp', JSON.stringify(usuarios));
    }, [usuarios]);

    // 4. FUNCIÓN DE REGISTRO (CREATE ACCOUNT)
    const createAccount = (newUserData) => {
        // Validación: Email ya en uso
        const userExists = usuarios.some(u => u.email === newUserData.email);
        if (userExists) {
            return { success: false, message: "El email ya está registrado." };
        }

        // Registrar y guardar
        const newUser = { id: Date.now(), ...newUserData };
        setUsuarios(prevUsers => [...prevUsers, newUser]);
        
        return { success: true, message: "Cuenta creada con éxito." };
    };

    // 5. FUNCIÓN DE LOGIN (Para el componente Login.jsx)
    const login = (email, password) => {
        const user = usuarios.find(
            (u) => u.email === email && u.password === password
        );
        
        if (user) {
            setUsuarioLogueado(user);
            return { success: true, message: "Inicio de sesión exitoso.", user };
        }
        return { success: false, message: "Credenciales inválidas." };
    };

    const value = {
        usuarioLogueado,
        createAccount,
        login,
        // ... (puedes añadir logout aquí)
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};