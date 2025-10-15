import React from 'react';
import { useParams } from 'react-router-dom';
import { spots } from '../data';

const SpotDetailPage = () => {
  const { id } = useParams();
  const spot = spots.find(s => s.spotId === id);

  if (!spot) {
    return <div>Spot no encontrado</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        {/* Carrusel de fotos */}
        <div id="carouselExample" className="carousel slide mb-4" data-bs-ride="carousel">
          <div className="carousel-inner">
            {spot.fotosUrls.map((foto, idx) => (
              <div
                className={`carousel-item${idx === 0 ? ' active' : ''}`}
                key={idx}
              >
                <img
                  src={foto}
                  className="d-block w-100"
                  alt={`Foto ${idx + 1} de ${spot.nombre}`}
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
          {spot.fotosUrls.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </>
          )}
        </div>
        <h1 className="card-title h2 fw-bold">{spot.nombre}</h1>
        <h2 className="text-muted mb-4">{spot.comuna}</h2>
        <p>{spot.descripcion}</p>
      </div>
    </div>
  );
};

export default SpotDetailPage;
