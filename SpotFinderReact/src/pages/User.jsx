import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/cssViejos/perfil.css'; 
import fotoPerfil from '../assets/images/fotoperfil.jpg';

const User = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

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
          <h4 id="nombreCompleto" className="mt-3">Nombre</h4>
          <hr style={{ borderTop: '2px solid black', width: '550px', margin: '0 auto 20px' }} />

          <p className="text-muted">Usuario Promedio de SpotFinder</p>
          <span className="badge bg-success mb-3">Activo</span>
           <hr style={{ borderTop: '2px solid black', width: '550px', margin: '0 auto 20px' }} />


          {/* Datos del usuario */}
          <ul className="list-group list-group-flush text-start mb-4">
            <li className="list-group-item bg-transparent border-0">
              <strong>Correo:</strong> <span id="Correo"></span>
            </li>
            <li className="list-group-item bg-transparent border-0">
              <strong>Género:</strong> <span id="genero"></span>
            </li>
          </ul>

          {/* Botón de cierre de sesión */}
          <button
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#confirmarLogout"
          >
            Cerrar sesión
          </button>
        </section>
      </div>

      {/* Modal de confirmación */}
      <div
        className="modal fade"
        id="confirmarLogout"
        tabIndex="-1"
        aria-labelledby="logoutLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow rounded">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutLabel">¿Cerrar sesión?</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro de que quieres cerrar sesión y volver a iniciar sesión?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
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
    </main>
  );
};

export default User;
