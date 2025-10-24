import React, { createContext, useContext, useState, useEffect } from 'react';
import { spots as initialSpots } from '../data'; // Importamos los datos iniciales
import { useAuth } from './AuthContext'; // Importamos el hook de autenticación

const SpotContext = createContext();

export const useSpots = () => useContext(SpotContext);

export const SpotProvider = ({ children }) => {
  const { user } = useAuth(); // Obtenemos el usuario actual
  // Inicializamos el estado de los spots con los datos del archivo data.js
  const [spots, setSpots] = useState(initialSpots);
  const [savedSpots, setSavedSpots] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // Cargar spots guardados desde localStorage cuando el usuario cambia
  useEffect(() => {
    if (user) {
      const storedSavedSpots = localStorage.getItem(`savedSpots_${user.id}`);
      setSavedSpots(storedSavedSpots ? JSON.parse(storedSavedSpots) : []);
    } else {
      setSavedSpots([]); // Limpiar si no hay usuario
    }
  }, [user]);

  // Guardar spots en localStorage cada vez que cambian
  useEffect(() => {
    if (user) {
      localStorage.setItem(`savedSpots_${user.id}`, JSON.stringify(savedSpots));
    }
  }, [savedSpots, user]);

  // Función para añadir un nuevo spot a la lista
  const addSpot = (newSpotData) => {
    setSpots(prevSpots => {
      // 1. Encontrar el ID más alto existente.
      // Usamos reduce para encontrar el máximo, convirtiendo los IDs a número.
      // El valor inicial es 0 por si la lista de spots estuviera vacía.
      const maxId = prevSpots.reduce((max, spot) => {
        const currentId = parseInt(spot.spotId, 10);
        return currentId > max ? currentId : max;
      }, 0);

      // 2. Crear el nuevo spot con el ID incremental (y como string para mantener consistencia).
      const newSpot = {
        ...newSpotData,
        spotId: (maxId + 1).toString(),
        calificacionPromedio: { seguridad: 0, limpieza: 0, accesibilidad: 0 },
      };

      // 3. Devolver el nuevo array de spots.
      return [newSpot, ...prevSpots];
    });
  };

  // Función para guardar o quitar un spot de favoritos
  const toggleSaveSpot = (spotId) => {
    setSavedSpots(prevSaved => {
      if (prevSaved.includes(spotId)) {
        return prevSaved.filter(id => id !== spotId); // Quitar
      } else {
        return [...prevSaved, spotId]; // Añadir
      }
    });
  };

  const value = { spots, addSpot, savedSpots, toggleSaveSpot, searchTerm, setSearchTerm };

  return (
    <SpotContext.Provider value={value}>{children}</SpotContext.Provider>
  );
};