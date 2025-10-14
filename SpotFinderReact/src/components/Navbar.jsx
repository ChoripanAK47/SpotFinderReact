import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#06402B' , opacity: 0.95}}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-white p-1 rounded me-2">
            <img src="/Logo_SpotFinder.png" alt="Logo de SpotFinder"/>
          </div>
          <span className="fw-bold fs-5">SpotFinder</span>
        </Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Spots</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/el_mapa">Mapa de Spots</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/perfil">Lugares Guardados</NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <Link to="/login" className="nav-link text-white me-3">Mi Cuenta</Link>
          <button className="btn btn-danger btn-sm">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;