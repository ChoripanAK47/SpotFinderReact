import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../assets/cssViejos/perfil.css'; 
import fotoPerfil from '../assets/images/fotoperfil.jpg';

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ Accede al usuario desde el contexto

  const handleLogout = () => {
    logout(); // ✅ Limpia el usuario del contexto
    navigate('/login');
  };

  // Este es un ejemplo simple. Para una implementación robusta,
  // considera usar una librería de modales para React como `react-bootstrap` o `react-modal`.
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <main className="fondo-ritual">
      <div className="envoltorio-user">
        <section className="carta-dinamica text-center">
          {/* Imagen de perfil */}
          <img
            src={fotoPerfil}
            className="Foto-perfil"
            alt="Foto de perfil"
          />

          {/* Nombre y estado */}
          <h4 id="nombreCompleto" className="mt-3">
            {user?.nombreCompleto || "Nombre"}
          </h4>
          <hr style={{ borderTop: '2px solid black', width: '550px', margin: '0 auto 20px' }} />

          <p className="text-muted">Usuario Promedio de SpotFinder</p>
          <span className="badge bg-success mb-3">Activo</span>
          <hr style={{ borderTop: '2px solid black', width: '550px', margin: '0 auto 20px' }} />

          {/* Datos del usuario */}
          <ul className="list-group list-group-flush text-start mb-4">
            <li className="list-group-item bg-transparent border-0">
              <strong>Correo:</strong> <span>{user?.email || "Sin correo"}</span>
            </li>
            <li className="list-group-item bg-transparent border-0">
              <strong>Género:</strong> <span>{user?.genero || "Sin género"}</span>
            </li>
          </ul>

          {/* Botón de cierre de sesión */}
          <button
            className="btn btn-outline-danger"
            onClick={handleShowModal}
          >
            Cerrar sesión
          </button>
        </section>
      </div>

      {/* Modal de confirmación (controlado por estado) */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow rounded">
              <div className="modal-header">
                <h5 className="modal-title">¿Cerrar sesión?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de que quieres cerrar sesión?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Sí, cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default User;
