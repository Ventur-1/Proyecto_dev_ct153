import React, { useState } from 'react';
import { Users, PlusCircle, LogIn } from 'lucide-react';
import CreateMatch from './CreateMatch';
import JoinMatch from './JoinMatch';

export default function Lobby() {
  const [view, setView] = useState('menu'); // 'menu', 'create', 'join'

  if (view === 'create') return <CreateMatch onBack={() => setView('menu')} />;
  if (view === 'join') return <JoinMatch onBack={() => setView('menu')} />;

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in no-print">
      <div>
        <h2 className="text-4xl font-black loteria-font text-white mb-2">Modo Multijugador</h2>
        <p className="text-slate-400">Juega en vivo con toda la clase usando Supabase Realtime.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Botón Profesor */}
        <button 
          onClick={() => setView('create')}
          className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:bg-slate-800/50 transition-all group shadow-xl"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <PlusCircle className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Crear Partida</h3>
            <p className="text-xs text-slate-400">Para el Profesor (Modo Gritón)</p>
          </div>
        </button>

        {/* Botón Alumno */}
        <button 
          onClick={() => setView('join')}
          className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:bg-slate-800/50 transition-all group shadow-xl"
        >
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <LogIn className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Unirse a Partida</h3>
            <p className="text-xs text-slate-400">Para los Alumnos (Planillas)</p>
          </div>
        </button>
      </div>
    </div>
  );
}