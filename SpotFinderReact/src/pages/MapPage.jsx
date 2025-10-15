import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { spots } from '../data';
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 200px)', // Altura del mapa
  borderRadius: '0.375rem'
};

const center = {
  lat: -32.95, // Centrado en la región de Valparaíso
  lng: -71.40
};

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [selectedSpot, setSelectedSpot] = useState(null);

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div className="card shadow-sm mx-auto">
      <div className="card-body p-2">
        <div className="row g-4">
          <div className="col-lg-8">
            <h1 className="card-title h4 fw-bold mb-3">Mapa Interactivo</h1>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              
            >
              {spots.map(spot => (
                <Marker
                  key={spot.spotId}
                  position={spot.ubicacion}
                  onClick={() => setSelectedSpot(spot)}
                />
              ))}
            </GoogleMap>
          </div>
          <div className="col-lg-4">
            <h2 className="h5 fw-bold mb-3">{selectedSpot ? 'Spot Seleccionado' : 'Spot Cercano'}</h2>
            {selectedSpot ? (
              <div className="card h-100 shadow-sm">
                <img
                  src={selectedSpot.fotosUrls[0]}
                  alt={`Foto de ${selectedSpot.nombre}`}
                  className="card-img-top"
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{selectedSpot.nombre}</h5>
                  <p className="card-text text-muted">{selectedSpot.comuna}</p>
                  <div className="d-grid">
                    <Link to={`/spot/${selectedSpot.spotId}`} className="btn btn-success fw-semibold">
                      Conocer
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted p-5 border rounded">
                <p>Haz clic en un marcador del mapa para ver los detalles del spot.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;