import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarSecundaria from './components/NavbarSecundaria';
import HomePage from './pages/HomePage';
import SpotDetailPage from './pages/SpotDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import MapPage from './pages/MapPage';
import User from './pages/User';
import NewSpotPage from './pages/NewSpotPage';
import Nosotros from './pages/Nosotros';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <>
      <Navbar />
      <main className="py-3">
        <Routes>
          {/* Rutas que usan el layout con sidebar */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/mapa" element={<Layout><MapPage /></Layout>} />
          <Route path="/spot/:id" element={<Layout><SpotDetailPage /></Layout>} />
          <Route path="/perfil" element={<Layout><ProfilePage /></Layout>} />

          {/* Ruta de login sin sidebar */}
          <Route path="/spots/nuevo" element={<NewSpotPage />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/User" element={<User />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />


        </Routes>
      </main>
    </>
  );
}

export default App;