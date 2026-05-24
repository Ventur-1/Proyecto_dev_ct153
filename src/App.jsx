import React, { useState } from 'react';
import MainMenu from './components/MainMenu.jsx';
import Instructions from './components/Instructions.jsx';
import DeckViewer from './components/DeckViewer.jsx';
import BoardGenerator from './components/BoardGenerator.jsx';
import GameGriton from './components/GameGriton.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-emerald-500/30">
      <MainMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="px-6 py-8 min-h-[calc(100vh-6rem)]">
        {activeTab === 'dashboard' && <Instructions />}
        {activeTab === 'deck' && <DeckViewer />}
        {activeTab === 'boards' && <BoardGenerator />}
        {activeTab === 'game' && <GameGriton />}
      </main>
    </div>
  );
}