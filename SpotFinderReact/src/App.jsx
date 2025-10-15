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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;