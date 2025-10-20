// LoginPage.jsx (Código modificado y corregido)

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // <--- Ajusta la ruta si es necesario
import '../assets/cssViejos/loginStyle.css';

const LoginPage = () => {
    // 1. Obtener funciones del Contexto y Hooks
    // NOTA: Es mejor usar el hook personalizado useAuth() en lugar de useContext(AuthContext)
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    // 2. Estado para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // 3. Manejador del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Llamada a la función login del AuthContext
        const result = login(email, password);

        if (result.success) {
            // Éxito: Redirigir a la página principal o de perfil
            navigate("/perfil"); 
            // Opcional: limpiar los campos
            setEmail('');
            setPassword('');
        } else {
            // Fracaso: Mostrar mensaje de error del Contexto
            setError(result.message);
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

                    <button className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center justify-content-center" disabled>
                        Continuar con Google
                    </button>

                    {/* Mostrar mensaje de error */}
                    {error && <p className="text-danger small text-center">{error}</p>} 

                    {/* 4. Asignar el manejador de envío */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3 text-start">
                            {/* 5. Conectar el input de email al estado */}
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="nombre@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Correo electrónico</label>
                        </div>
                        <div className="form-floating mb-3 text-start">
                            {/* 6. Conectar el input de password al estado */}
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Contraseña</label>
                        </div>
                        <div className="d-grid">
                            {/* 7. Asegurar que el botón es tipo submit */}
                            <button type="submit" className="btn btn-success btn-lg fw-semibold">Iniciar sesión</button>
                        </div>
                    </form>

                    <hr className="my-4" />

                    <p className="small">
                        Al iniciar sesión, aceptas los <a href="#" className="text-success">Términos del Servicio</a> y la <a href="#" className="text-success">Política de Privacidad</a>.
                    </p>
                    <p className="small text-muted">
                        ¿No tienes una cuenta? <Link to="/CreateAccount" className="text-success fw-semibold">Regístrate ahora</Link>. {/* ✅ CORREGIDO a /CreateAccount */}
                    </p>
                </section>
            </div>
        </main>
    );
};

export default LoginPage;
