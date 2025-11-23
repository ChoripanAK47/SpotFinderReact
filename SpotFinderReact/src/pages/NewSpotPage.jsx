import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpots } from '../components/SpotContext';

const NewSpotPage = () => {
  const { addSpot } = useSpots();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [comuna, setComuna] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [fotoPreview, setFotoPreview] = useState(''); // Estado para la vista previa de la foto
  const [servicios, setServicios] = useState({
    tieneBanos: false,
    tieneZonasRecreativas: false,
    tieneComercioCercano: false,
  });

  const handleServiciosChange = (e) => {
    const { name, checked } = e.target;
    setServicios(prev => ({ ...prev, [name]: checked }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creamos una URL local para la vista previa de la imagen
      setFotoPreview(URL.createObjectURL(file));
    } else {
      setFotoPreview('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpot = {
      nombre,
      descripcion,
      comuna,
      ubicacion: { lat: parseFloat(lat), lng: parseFloat(lng) },
      fotosUrls: [fotoPreview || 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=Spot'], // Usar la URL de la vista previa
      servicios,
    };
    addSpot(newSpot);
    alert('¡Spot añadido con éxito!');
    navigate('/'); // Redirigir a la página principal
  };

  return (
    <div className="container p-3 ">
      <div className="row justify-content-center">
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body p-1">
              <h1 className="card-title text-center fw-bold mb-4">Añadir un Nuevo Spot</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre del Spot</label>
                  <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <textarea className="form-control" id="descripcion" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="comuna" className="form-label">Comuna</label>
                  <input type="text" className="form-control" id="comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="fotoUrl" className="form-label">Adjuntar Foto/s</label>
                  <input type="file" className="form-control" id="fotoUrl" accept="image/*" onChange={handleFotoChange} />
                  {fotoPreview && (
                    <div className="mt-3 text-center">
                      <p className="small">Vista previa:</p>
                      <img src={fotoPreview} alt="Vista previa del spot" style={{ maxWidth: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.375rem' }} />
                    </div>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="lat" className="form-label">Latitud</label>
                    <input type="number" step="any" className="form-control" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lng" className="form-label">Longitud</label>
                    <input type="number" step="any" className="form-control" id="lng" value={lng} onChange={(e) => setLng(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label">Servicios Disponibles</label>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="tieneBanos" id="tieneBanos" checked={servicios.tieneBanos} onChange={handleServiciosChange} />
                    <label className="form-check-label" htmlFor="tieneBanos">Baños</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="tieneZonasRecreativas" id="tieneZonasRecreativas" checked={servicios.tieneZonasRecreativas} onChange={handleServiciosChange} />
                    <label className="form-check-label" htmlFor="tieneZonasRecreativas">Zonas Recreativas</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="tieneComercioCercano" id="tieneComercioCercano" checked={servicios.tieneComercioCercano} onChange={handleServiciosChange} />
                    <label className="form-check-label" htmlFor="tieneComercioCercano">Comercio Cercano</label>
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success fw-bold">Publicar Spot</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSpotPage;