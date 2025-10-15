import React from 'react';
import { spots } from '../data';
import SpotCard from '../components/SpotCard';

const filters = ['Todos', 'Mejor Valoradas', 'Distancia', 'Skateparks', 'Miradores', 'Parques', 'Plazas', 'Urbano'];
const HomePage = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body p-1">
        <div className="pb-3 mb-4 border-bottom">
          <h1 className="card-title h4 fw-bold">Filtrar Spots</h1>
          <div className="d-flex flex-wrap gap-2 mt-3">
            {filters.map(filter => (
              <button key={filter} type="button" className="btn btn-sm btn-outline-secondary">
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          {spots.map(spot => (
            <SpotCard key={spot.spotId} spot={spot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;