import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import '../assets/cssViejos/loginStyle.css';

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña })
      });

      const text = await res.text();
      let usuario;

      try {
        usuario = JSON.parse(text);
      } catch (err) {
        console.error("⚠️ La respuesta no es JSON. Recibido:", text);
        throw new Error("El servidor no respondió con datos válidos");
      }

      if (!res.ok) {
        throw new Error(usuario.error || 'Error desconocido');
      }

      login(usuario);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

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

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3 text-start">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Correo electrónico</label>
            </div>
            <div className="form-floating mb-3 text-start">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg fw-semibold">Iniciar sesión</button>
            </div>
            {error && <p className="text-danger mt-3">{error}</p>}
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
