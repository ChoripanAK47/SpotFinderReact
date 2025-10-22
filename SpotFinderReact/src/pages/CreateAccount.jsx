import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../assets/cssViejos/Registro.css';

const CreateAccountPage = () => {
  const { createAccount } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    passwordConfirm: '',
    genero: 'Tu Género:',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const result = createAccount({
      nombreCompleto: formData.nombreCompleto,
      email: formData.email, 
      password: formData.password,
      genero: formData.genero,
    });

    if (result.success) {
      alert("¡Registro exitoso! Redirigiendo a iniciar sesión.");
      navigate("/login"); 
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="fondo-blanco-dinamico">
      <main className="d-flex justify-content-center align-items-start pt-5">
        <section className="container my-2 w-50 p-3 fondo-section carta-dinamica">
          <form className="row g-3" onSubmit={handleSubmit}> 
            {error && <p className="text-danger text-center col-12">{error}</p>}

            <div className="col-md-4">
              <label htmlFor="nombreCompleto" className="form-label">Nombre Completo:</label>
              <input 
                type="text" 
                className="form-control" 
                id="nombreCompleto" 
                value={formData.nombreCompleto}
                onChange={handleChange}
                required 
                placeholder="Ingresa tu nombre" 
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="Ingresa tu email" 
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input 
                type="password" 
                className="form-control" 
                id="password"
                value={formData.password}
                onChange={handleChange}
                required 
                placeholder="Ingresa tu contraseña" 
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="passwordConfirm" className="form-label">Confirma contraseña:</label>
              <input 
                type="password" 
                className="form-control" 
                id="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required 
                placeholder="Confirma tu contraseña" 
              />
            </div>

            <div className="col-12">
              <label htmlFor="genero" className="form-label">Género:</label>
              <select 
                className="form-select form-select-lg mb-3" 
                id="genero"
                value={formData.genero}
                onChange={handleChange} 
                aria-label="Large select example"
              >
                <option disabled>Tu Género:</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="col-12">
              <div className="IniciarSesion text-center mb-3">
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
              </div>
              <button type="submit" className="button">
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
