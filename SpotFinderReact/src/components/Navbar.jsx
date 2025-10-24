import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="">
            <img src="/Logo_SpotFinder.png" alt="Logo de SpotFinder"/>
          </div>
          <span className="fw-bold fs-5"></span>
        </Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Ver Spots</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mapa">Mapa de Spots</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/spots/nuevo">Añadir Spot</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/perfil">Lugares Guardados</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {user ? (
            <>
              <Link to="/user" className="nav-link text-white me-3">Mi Cuenta</Link>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link text-white me-3">
                <button className="btn btn-success btn-sm">Iniciar Sesión</button>
              </Link>
              <Link to="/register" className="nav-link text-white">
                <button className="btn btn-outline-light btn-sm">Registrarse</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;