import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/cssViejos/loginStyle.css';

const LoginPage = () => {
  return (
    <main className="fondo-ritual">
      <div className="envoltorio-login">
        <section className="carta-dinamica text-center">
          <h2 className="fw-bold mb-3">Iniciar sesión</h2>
          <hr style={{ borderTop: '2px solid black', width: '100px', margin: '0 auto 20px' }} />
          <p className="text-muted mb-4">Accede con tu cuenta o crea una nueva para comenzar.</p>
          <hr style={{ borderTop: '2px solid black', width: '100px', margin: '0 auto 20px' }} />

          <button className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center justify-content-center">
            Continuar con Google
          </button>

          <form>
            <div className="form-floating mb-3 text-start">
              <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" />
              <label htmlFor="email">Correo electrónico</label>
            </div>
            <div className="form-floating mb-3 text-start">
              <input type="password" className="form-control" id="password" placeholder="Contraseña" />
              <label htmlFor="password">Contraseña</label>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg fw-semibold">Iniciar sesión</button>
            </div>
          </form>

          <hr className="my-4" />

          <p className="small">
            Al iniciar sesión, aceptas los <a href="#" className="text-success">Términos del Servicio</a> y la <a href="#" className="text-success">Política de Privacidad</a>.
          </p>
          <p className="small text-muted">
            ¿No tienes una cuenta? <Link to="/CreateAccount" className="text-success fw-semibold">Regístrate ahora</Link>.
          </p>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
