import React, { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from './supabaseClient';
import LiveStudentBoard from './LiveStudentBoard';

export default function JoinMatch({ onBack }) {
  const [code, setCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState(null);
  const [joinedMatch, setJoinedMatch] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleJoinMatch = async () => {
    if (code.length !== 6) {
      setError("El código debe tener exactamente 6 caracteres.");
      return;
    }

    setIsJoining(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('partidas').select('*').eq('codigo', code).single();

      if (supabaseError || !data) {
        setError("No se encontró ninguna partida activa con este código.");
      } else {
        setJoinedMatch(data);
      }
    } catch (err) {
      console.error("Error al unirse:", err);
      setError("Hubo un problema de conexión. Intenta de nuevo.");
    } finally {
      setIsJoining(false);
    }
  };

  // AQUÍ GARANTIZAMOS EL ROL: Si está jugando, carga el Tablero del ALUMNO
  if (isPlaying && joinedMatch) {
    return <LiveStudentBoard matchData={joinedMatch} />;
  }

  return (
    <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl max-w-md mx-auto text-center animate-fade-in no-print">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Volver
      </button>
      
      <h2 className="text-3xl font-black loteria-font text-emerald-400 mb-2">Unirse a Partida (Alumno)</h2>
      
      {!joinedMatch ? (
        <>
          <p className="text-slate-400 text-sm mb-8">Ingresa el código que te dio el profesor.</p>
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Código de la partida</label>
              <input 
                type="text" maxLength="6" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-700 text-white font-bold text-center uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                placeholder="A7X9P2"
              />
              {error && <p className="text-red-400 text-xs mt-2 text-center font-medium">{error}</p>}
            </div>
            <button 
              onClick={handleJoinMatch} disabled={isJoining || code.length === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex justify-center items-center gap-2"
            >
              {isJoining ? <Loader2 className="w-6 h-6 animate-spin" /> : "Entrar al juego"}
            </button>
          </div>
        </>
      ) : (
        <div className="animate-fade-in space-y-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-emerald-400" />
          </div>
          <p className="text-slate-200 font-bold text-xl">¡Te has unido correctamente!</p>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-400 space-y-2">
            <p>Generando tu planilla única de juego...</p>
            <p className="text-emerald-500 animate-pulse">Esperando a que el profesor inicie el juego...</p>
          </div>
          <button 
            onClick={() => setIsPlaying(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-xl"
          >
            Ver mi Planilla
          </button>
        </div>
      )}
    </div>
  );
}