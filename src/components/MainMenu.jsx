// Archivo: src/components/MainMenu.jsx
import React from 'react';
import { Terminal, LayoutDashboard, PlayCircle, Layers, Grid } from 'lucide-react';

export default function MainMenu({ activeTab, setActiveTab }) {
  const navTabs = [
    { id: 'dashboard', label: 'Instructivo', icon: LayoutDashboard },
    { id: 'deck', label: 'Ver Mazo', icon: Layers },
    { id: 'boards', label: 'Planillas', icon: Grid },
    { id: 'game', label: 'Modo Gritón', icon: PlayCircle, special: true },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
            <Terminal className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black loteria-font tracking-wide text-white">Lotería del Dev</h1>
            <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest mt-0.5">Arquitectura Desacoplada</p>
          </div>
        </div>
        
        <nav className="flex gap-2 sm:gap-3">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-bold rounded-xl flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? tab.special
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                      : 'bg-slate-800 text-white border border-slate-600'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}