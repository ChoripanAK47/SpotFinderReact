import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios desde la API del server + localStorage
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/users");

        if (!res.ok) {
          throw new Error("Respuesta inválida del servidor");
        }

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("⚠️ La respuesta no es JSON. Recibido:", text);
          throw err;
        }

        const localUsers = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Normalizar campo contraseña → password
        const serverUsers = Array.isArray(data)
          ? data.map(u => ({ ...u, password: u.password ?? u.contraseña }))
          : [];

        setUsers([...serverUsers, ...localUsers]);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      } finally {
        setLoading(false);
      }
    };

    const cargarSesion = () => {
      const saved = localStorage.getItem("usuarioActivo");
      if (saved) setUsuarioActivo(JSON.parse(saved));
    };

    cargarUsuarios();
    cargarSesion();
  }, []);

  // Registrar nuevo usuario (guarda en localStorage con campo password normalizado)
  const registrarUsuario = (nuevoUsuario) => {
    const usuarioNormalizado = {
      ...nuevoUsuario,
      password: nuevoUsuario.password ?? nuevoUsuario.contraseña
    };

    const actualizados = [...users, usuarioNormalizado];
    setUsers(actualizados);

    const localUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    localUsers.push(usuarioNormalizado);
    localStorage.setItem("usuarios", JSON.stringify(localUsers));
  };

  // Iniciar sesión
  const login = (usuario) => {
    const usuarioNormalizado = {
      ...usuario,
      password: usuario.password ?? usuario.contraseña
    };

    setUsuarioActivo(usuarioNormalizado);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioNormalizado));
  };

  // Cerrar sesión
  const logout = () => {
    setUsuarioActivo(null);
    localStorage.removeItem("usuarioActivo");
  };

  return (
    <UserContext.Provider
      value={{
        users,
        usuarioActivo,
        registrarUsuario,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
