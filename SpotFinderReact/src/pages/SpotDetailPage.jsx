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
        <img 
          src={spot.fotosUrls[0]} 
          alt={`Foto de ${spot.nombre}`} 
          className="img-fluid rounded mb-4"
        />
        <h1 className="card-title h2 fw-bold">{spot.nombre}</h1>
        <h2 className="text-muted mb-4">{spot.comuna}</h2>
        <p>{spot.descripcion}</p>
      </div>
    </div>
  );
};

export default SpotDetailPage;
