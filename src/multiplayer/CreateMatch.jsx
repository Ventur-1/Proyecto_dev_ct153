import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from './supabaseClient';
import LiveTeacherBoard from './LiveTeacherBoard';

export default function CreateMatch({ onBack }) {
  const [players, setPlayers] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Estados con memoria de localStorage
  const [matchCode, setMatchCode] = useState(() => localStorage.getItem('teacher_matchCode') || null);
  const [isPlaying, setIsPlaying] = useState(() => localStorage.getItem('teacher_isPlaying') === 'true');

  useEffect(() => {
    if (matchCode) localStorage.setItem('teacher_matchCode', matchCode);
    else localStorage.removeItem('teacher_matchCode');
  }, [matchCode]);

  useEffect(() => {
    localStorage.setItem('teacher_isPlaying', isPlaying);
  }, [isPlaying]);

  const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleCreateMatch = async () => {
    const numPlayers = parseInt(players);
    if (!numPlayers || numPlayers <= 0) {
      setError("Por favor, ingresa un número válido de jugadores.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    const newCode = generateCode();

    try {
      const { error: supabaseError } = await supabase
        .from('partidas')
        .insert([{ codigo: newCode, jugadores_esperados: numPlayers, estado: 'esperando' }]);

      if (supabaseError) throw supabaseError;
      setMatchCode(newCode);
    } catch (err) {
      console.error("Error al crear partida:", err);
      setError("Hubo un error de red. Intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isPlaying && matchCode) {
    return <LiveTeacherBoard matchData={{ codigo: matchCode }} />;
  }

  return (
    <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl max-w-md mx-auto text-center animate-fade-in no-print">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Volver
      </button>
      
      <h2 className="text-3xl font-black loteria-font text-white mb-2">Crear Partida (Profesor)</h2>
      
      {!matchCode ? (
        <>
          <p className="text-slate-400 text-sm mb-8">Elige cuántos alumnos van a jugar.</p>
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">¿Cuántos jugadores jugarán?</label>
              <input 
                type="number" min="1" value={players} onChange={(e) => setPlayers(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder="Ej. 30"
              />
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>
            <button 
              onClick={handleCreateMatch} disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex justify-center items-center gap-2"
            >
              {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : "Generar código de partida"}
            </button>
          </div>
        </>
      ) : (
        <div className="animate-fade-in space-y-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-emerald-400" />
          </div>
          <p className="text-slate-300 font-medium">¡Partida creada! Dicta este código a los alumnos:</p>
          <div className="bg-slate-950 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-inner">
            <span className="text-5xl font-black tracking-[0.2em] text-emerald-400">{matchCode}</span>
          </div>
          <button 
            onClick={() => setIsPlaying(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-xl"
          >
            Comenzar Modo Gritón
          </button>
        </div>
      )}
    </div>
  );
}