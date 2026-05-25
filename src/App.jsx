import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu.jsx';
import Instructions from './components/Instructions.jsx';
import DeckViewer from './components/DeckViewer.jsx';
import BoardGenerator from './components/BoardGenerator.jsx';
import GameGriton from './components/GameGriton.jsx';
import Lobby from './multiplayer/Lobby.jsx';

export default function App() {
  // Leemos el localStorage para no perder la vista activa
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('loteria_active_tab') || 'dashboard';
  });

  // Guardamos la vista en localStorage cada que cambia
  useEffect(() => {
    localStorage.setItem('loteria_active_tab', activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-emerald-500/30">
      <MainMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="px-6 py-8 min-h-[calc(100vh-6rem)]">
        {/* El Modo Gritón original sigue vivo por si se necesita, pero oculto del menú */}
        <div className={activeTab === 'dashboard' ? 'block' : 'hidden'}><Instructions /></div>
        <div className={activeTab === 'deck' ? 'block' : 'hidden'}><DeckViewer /></div>
        <div className={activeTab === 'boards' ? 'block' : 'hidden'}><BoardGenerator /></div>
        <div className={activeTab === 'game' ? 'block' : 'hidden'}><GameGriton /></div>
        <div className={activeTab === 'multiplayer' ? 'block' : 'hidden'}><Lobby /></div>
      </main>
    </div>
  );
}