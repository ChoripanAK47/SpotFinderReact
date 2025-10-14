import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SpotDetailPage from './pages/SpotDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Navbar />
      <main className="py-5">
        <Routes>
          {/* Rutas que usan el layout con sidebar */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
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