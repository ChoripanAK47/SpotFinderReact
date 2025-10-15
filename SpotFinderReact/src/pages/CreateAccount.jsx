import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/cssViejos/Registro.css'; // Asegúrate que este archivo contenga las clases necesarias

const CreateAccountPage = () => {
  return (
    <div className="fondo-blanco-dinamico">
      <main className="d-flex justify-content-center align-items-start pt-5">
        <section className="container my-2 w-50 p-3 fondo-section carta-dinamica">
          <form className="row g-3">
            <div className="mb-4 text-center">
              <h1 className="fs-2 fw-bold Titulo">Bienvenido a SpotFinder</h1>
              <hr style={{ borderTop: '2px solid black', width: '500px', margin: '0 auto 10px' }} />

              <div className="linea-negra"></div>
              <p className="fs-6 text-muted Subtitulo">
                Crea tu cuenta para comenzar a explorar los mejores lugares
              </p>
                <hr style={{ borderTop: '2px solid black', width: '590px', margin: '0 auto 1px' }} />
            </div>

            <div className="col-md-4">
              <label htmlFor="nombreCompleto" className="form-label">Nombre Completo:</label>
              <input type="text" className="form-control" id="nombreCompleto" required placeholder="Ingresa tu nombre" />
            </div>

            <div className="col-md-6">
              <label htmlFor="Correo" className="form-label">Email</label>
              <input type="email" className="form-control" id="Correo" required placeholder="Ingresa tu email" />
            </div>

            <div className="col-md-6">
              <label htmlFor="password1" className="form-label">Contraseña:</label>
              <input type="password" className="form-control" id="password1" required placeholder="Ingresa tu contraseña" />
            </div>

            <div className="col-md-6">
              <label htmlFor="password2" className="form-label">Confirma contraseña:</label>
              <input type="password" className="form-control" id="password2" required placeholder="Confirma tu contraseña" />
            </div>

            <div className="col-12">
              <select className="form-select form-select-lg mb-3" id="genero" aria-label="Large select example">
                <option selected disabled>Tu Género:</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" htmlFor="gridCheck">
                  Acepto los términos y condiciones
                  <div className="IniciarSesion">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                  </div>
                </label>
              </div>
            </div>

            <div className="col-12">
              <button type="button" className="button" onClick={() => console.log('registroUsuario()')}>
                Registrarse
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateAccountPage;
