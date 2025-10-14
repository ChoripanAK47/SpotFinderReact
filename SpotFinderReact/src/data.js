// Datos de ejemplo para simular una base de datos.
// ¡Puedes añadir más spots de tu zona!

export const spots = [
  {
    spotId: '1',
    nombre: 'Parque La Calera',
    descripcion: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ubicacion: { lat: -33.0232, lng: -71.5530 },
    fotosUrls: ['../src/assets/images/imagesSpots/ParqueLaCalera.jpg'],
    comuna: 'La Calera',
    calificacionPromedio: { seguridad: 4, limpieza: 5, accesibilidad: 5 },
    servicios: { tieneBanos: true, tieneZonasRecreativas: false, tieneComercioCercano: true }
  },
  {
    spotId: '2',
    nombre: 'Skatepark La Calera',
    descripcion: 'Skatepark en La Calera.',
    ubicacion: { lat: -33.0264, lng: -71.5503 },
    fotosUrls: ['../src/assets/images/imagesSpots/SkateparkLaCalera.jpg'],
    comuna: 'La Calera',
    calificacionPromedio: { seguridad: 4, limpieza: 4, accesibilidad: 5 },
    servicios: { tieneBanos: true, tieneZonasRecreativas: true, tieneComercioCercano: false }
  },
  {
    spotId: '3',
    nombre: 'Laguna Sausalito',
    descripcion: 'Laguna Sausalito.',
    ubicacion: { lat: -33.0378, lng: -71.6310 },
    fotosUrls: ['../src/assets/images/imagesSpots/LagunaSausalitoVina.jpg'],
    comuna: 'Viña del Mar',
    calificacionPromedio: { seguridad: 3, limpieza: 2, accesibilidad: 3 },
    servicios: { tieneBanos: true, tieneZonasRecreativas: false, tieneComercioCercano: true }
  },
];
