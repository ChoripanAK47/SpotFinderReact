import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="container" style={{ maxWidth: '480px' }}>
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-5 text-center">
                    <h2 className="fw-bold mb-3">Iniciar sesión</h2>
                    <p className="text-muted mb-4">Accede con tu cuenta o crea una nueva para comenzar.</p>

                    <button className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center justify-content-center">
                        <img src="[https://img.icons8.com/color/16/000000/google-logo.png](https://img.icons8.com/color/16/000000/google-logo.png)" alt="Google logo" className="me-2" />
                        Continuar con Google
                    </button>

                    <form>
                        <div className="form-floating mb-3 text-start">
                            <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" />
                            <label htmlFor="email">Correo electrónico</label>
                        </div>
                        <div className="form-floating mb-3 text-start">
                            <input type="password" class="form-control" id="password" placeholder="Contraseña" />
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
                        ¿No tienes una cuenta? <a href="#" className="text-success fw-semibold">Regístrate ahora</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
