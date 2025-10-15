import React from 'react';
import { useParams } from 'react-router-dom';
import { spots } from '../data';

// Componente auxiliar para renderizar las estrellas de calificación
const StarRating = ({ rating, label }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="d-flex align-items-center mb-2">
      <span className="me-3" style={{ minWidth: '110px' }}>{label}</span>
      <div>
        {[...Array(totalStars)].map((_, index) => (
          <svg key={index} xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="20" height="20" fill={index < filledStars ? '#ffc107' : '#e4e5e9'} className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        ))}
      </div>
    </div>
  );
};

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
          <div className="carousel-inner rounded">
            {spot.fotosUrls.map((foto, idx) => (
              <div
                className={`carousel-item${idx === 0 ? ' active' : ''}`}
                key={idx}
              >
                <img
                  src={foto}
                  className="d-block w-100"
                  alt={`Foto ${idx + 1} de ${spot.nombre}`}
                  style={{ maxHeight: '450px', objectFit: 'cover' }}
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

        <hr className="my-4" />

        {/* Sección de Calificaciones y Servicios */}
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Calificaciones</h5>
            <StarRating rating={spot.calificacionPromedio.seguridad} label="Seguridad" />
            <StarRating rating={spot.calificacionPromedio.limpieza} label="Limpieza" />
            <StarRating rating={spot.calificacionPromedio.accesibilidad} label="Accesibilidad" />
          </div>
          <div className="col-md-6">
            <h5 className="fw-bold mb-3">Servicios Disponibles</h5>
            <ul className="list-unstyled">
              {spot.servicios.tieneBanos && <li className="mb-2 d-flex align-items-center"><svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> Baños disponibles</li>}
              {spot.servicios.tieneZonasRecreativas && <li className="mb-2 d-flex align-items-center"><svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> Zonas recreativas</li>}
              {spot.servicios.tieneComercioCercano && <li className="mb-2 d-flex align-items-center"><svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> Comercio cercano</li>}
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        {/* Descripción con párrafos separados */}
        <div>
          <h5 className="fw-bold mb-3">Descripción</h5>
          {spot.descripcion.split('\n').map((paragraph, index) => (
            paragraph.trim() !== '' && <p key={index} className="mb-3">{paragraph}</p>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SpotDetailPage;