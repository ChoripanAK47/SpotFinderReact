import React from 'react';

const Sidebar = () => {
  return (
    <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
      <div className="card-body text-center">
        <img 
          src="/GatoPrisma.gif"
          alt="Avatar de usuario" 
          className="mx-auto mb-3 sidebar-avatar"
        />
        <h5 className="card-title fw-bold">Bienvenido a SpotFinder</h5>
        <p className="card-text text-muted small mb-4">
          El lugar adecuado para buscar tu próximo sitio favorito al aire libre 👟
        </p>
        <div className="text-start">
          <label htmlFor="search" className="form-label small fw-medium">Buscar Spot</label>
          <div className="input-group">
            <input 
              type="text" 
              id="search"
              placeholder="Ej: Plaza, Parque..."
              className="form-control"
            />
            <button className="btn btn-success">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;