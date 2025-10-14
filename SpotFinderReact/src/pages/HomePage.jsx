import React from 'react';
import { spots } from '../data';
import SpotCard from '../components/SpotCard';

const HomePage = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <div className="pb-3 mb-4 border-bottom">
          <h1 className="card-title h4 fw-bold">Filtrar Spots</h1>
          {/* Aquí puedes agregar botones de filtro */}
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