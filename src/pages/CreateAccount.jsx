import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import '../assets/cssViejos/Registro.css';

const CreateAccount = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [genero, setGenero] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    if (password1 !== password2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      nombre: nombre.trim(),
      email: email.trim(),
      contraseña: password1.trim(),
      genero,
    };

    try {
      const res = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error desconocido');
      }

      const data = await res.json();
      login(data);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

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
              <label htmlFor="nombre" className="form-label">Nombre Completo:</label>
              <input type="text" className="form-control" id="nombre" required placeholder="Ingresa tu nombre"
                value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label htmlFor="Correo" className="form-label">Email</label>
              <input type="email" className="form-control" id="Correo" required placeholder="Ingresa tu email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label htmlFor="password1" className="form-label">Contraseña:</label>
              <input type="password" className="form-control" id="password1" required placeholder="Ingresa tu contraseña"
                value={password1} onChange={(e) => setPassword1(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label htmlFor="password2" className="form-label">Confirma contraseña:</label>
              <input type="password" className="form-control" id="password2" required placeholder="Confirma tu contraseña"
                value={password2} onChange={(e) => setPassword2(e.target.value)} />
            </div>

            <div className="col-12">
              <select className="form-select form-select-lg mb-3" id="genero"
                value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="" disabled>Tu Género:</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck"
                  checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} />
                <label className="form-check-label" htmlFor="gridCheck">
                  Acepto los términos y condiciones
                  <div className="IniciarSesion">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                  </div>
                </label>
              </div>
            </div>

            <div className="col-12">
              <button type="button" className="button" onClick={handleRegister}>
                Registrarse
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateAccount;
