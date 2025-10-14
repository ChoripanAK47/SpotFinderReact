import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid px-3 px-md-4">
      <div className="row g-4">
        {/* Columna de la Barra Lateral */}
        <div className="col-lg-3">
          <Sidebar />
        </div>
        {/* Columna del Contenido Principal */}
        <div className="col-lg-9">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
