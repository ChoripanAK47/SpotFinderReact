import React, { useEffect, useState } from 'react';
import '../index.css';
import { useAuth } from '../components/AuthContext';

const Administracion = () => {
  const { user, fetchAllUsers, deleteUserById, updateUserById, loading: authLoading } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({}); // { [id]: { rol: 'USER' } }

  const loadUsers = async () => {
    setLoading(true);
    const res = await fetchAllUsers();
    if (res.success) setUsuarios(res.data || []);
    else {
      setUsuarios([]);
      alert('Error al cargar usuarios: ' + (res.message || 'unknown'));
    }
    setLoading(false);
  };

  useEffect(() => {
    // esperar a que el contexto termine de verificar la sesión
    if (!authLoading && (user?.rol === 'ADMIN' || user?.role === 'ADMIN')) loadUsers();
  }, [user, authLoading]);

  const handleDelete = async (id) => {
    if (!window.confirm('Eliminar usuario? Esta acción es irreversible.')) return;
    const res = await deleteUserById(id);
    if (res.success) {
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } else {
      alert('Error al eliminar: ' + (res.message || 'unknown'));
    }
  };

  const handleChangeRol = (id, value) => {
    setEditing(prev => ({ ...prev, [id]: { ...(prev[id] || {}), rol: value } }));
  };

  const handleSave = async (id) => {
    const patch = editing[id];
    if (!patch) return;
    // Buscar el usuario actual y mergear para evitar perder campos en el PUT
    const usuarioActual = usuarios.find(u => u.id === id);
    if (!usuarioActual) return alert('Usuario no encontrado en lista local');

    const body = { ...usuarioActual, ...patch }; // id incluido en usuarioActual
    const res = await updateUserById(id, body);
    if (res.success) {
      setUsuarios(prev => prev.map(u => (u.id === id ? { ...u, ...res.data } : u)));
      setEditing(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } else {
      alert('Error al actualizar: ' + (res.message || 'unknown'));
    }
  };

  if (!(user?.rol === 'ADMIN' || user?.role === 'ADMIN')) {
    return (
      <main className="ventana-administracion">
        <div className="card p-4 m-4">
          <div className="card-body">
            <h4>Acceso denegado</h4>
            <p>Se requiere rol ADMIN para acceder a esta sección.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="ventana-administracion">
      <div className="card shadow-sm p-4 m-4">
        <div className="card-body p-4">
          <h1 className="card-title h4 fw-bold">Ventana de Administración</h1>
          <p>Funciones: listar, eliminar y actualizar usuarios</p>

          {loading ? (
            <p>Cargando usuarios...</p>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.nombre} {u.apellido || ''}</td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          value={(editing[u.id]?.rol ?? u.rol ?? u.role ?? '')}
                          onChange={(e) => handleChangeRol(u.id, e.target.value)}
                          className="form-select form-select-sm"
                          style={{ width: '140px' }}
                        >
                          <option value="">--</option>
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-success me-2" onClick={() => handleSave(u.id)}>Guardar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {usuarios.length === 0 && <p>No hay usuarios para mostrar.</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Administracion;