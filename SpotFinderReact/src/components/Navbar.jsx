import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#175536ff' , opacity: 0.98}}>
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
              <NavLink className="nav-link" to="/">Spots</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mapa">Mapa de Spots</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/perfil">Lugares Guardados</NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <Link to="/User" className="nav-link text-white me-3">Mi Cuenta</Link>
          <Link to="/login">
          <button className="btn btn-danger btn-sm">Cerrar Sesión</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;