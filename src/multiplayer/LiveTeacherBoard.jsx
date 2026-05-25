import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { conceptsData } from '../data/concepts.jsx'; 

export default function LiveTeacherBoard({ matchData }) {
  // Usar localStorage para no perder el mazo y el historial al recargar
  const [deck, setDeck] = useState(() => {
    const savedDeck = localStorage.getItem(`teacher_deck_${matchData.codigo}`);
    return savedDeck ? JSON.parse(savedDeck) : [...conceptsData].sort(() => 0.5 - Math.random());
  });
  
  const [revealed, setRevealed] = useState(() => {
    const savedRevealed = localStorage.getItem(`teacher_revealed_${matchData.codigo}`);
    return savedRevealed ? JSON.parse(savedRevealed) : [];
  });
  
  const [notification, setNotification] = useState('');

  // Guardar cada cambio en localStorage
  useEffect(() => {
    localStorage.setItem(`teacher_deck_${matchData.codigo}`, JSON.stringify(deck));
    localStorage.setItem(`teacher_revealed_${matchData.codigo}`, JSON.stringify(revealed));
  }, [deck, revealed, matchData.codigo]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const drawNextCard = async () => {
    if (deck.length === 0) {
      showNotification("¡El mazo está vacío!");
      return;
    }
    
    const card = deck[0]; 
    const newDeck = deck.slice(1);
    const newRevealed = [card, ...revealed]; 
    
    setDeck(newDeck);
    setRevealed(newRevealed);

    try {
      await supabase
        .from('partidas')
        .update({ cartas_reveladas: newRevealed.map(c => c.id) })
        .eq('codigo', matchData.codigo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestart = async () => {
    if (window.confirm("¿Volver a comenzar? Se barajará un nuevo mazo y se limpiarán las planillas.")) {
      setDeck([...conceptsData].sort(() => 0.5 - Math.random()));
      setRevealed([]);
      try {
        await supabase.from('partidas').update({ cartas_reveladas: [] }).eq('codigo', matchData.codigo);
      } catch (err) { console.error(err); }
    }
  };

  const handleEndGame = async () => {
    if (window.confirm("¿Estás seguro de finalizar la partida y sacar a todos?")) {
      try {
        await supabase.from('partidas').update({ estado: 'finalizada' }).eq('codigo', matchData.codigo);
        localStorage.removeItem(`teacher_matchCode`);
        localStorage.removeItem(`teacher_isPlaying`);
        localStorage.removeItem(`teacher_deck_${matchData.codigo}`);
        localStorage.removeItem(`teacher_revealed_${matchData.codigo}`);
        window.location.reload(); 
      } catch (err) { console.error(err); }
    }
  };

  const currentCard = revealed.length > 0 ? revealed[0] : null;
  const history = revealed.length > 1 ? revealed.slice(1) : [];

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto animate-fade-in no-print">
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-8 py-3 rounded-full shadow-2xl border border-slate-700 z-50 animate-bounce font-bold text-lg">
          {notification}
        </div>
      )}

      {/* ZONA SUPERIOR: Carta Actual y Controles */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl relative min-h-[380px]">
          <h2 className="absolute top-6 left-8 text-xl font-bold text-slate-400">Carta Actual</h2>
          <span className="absolute top-6 right-8 text-xl font-bold text-slate-500">Código: <span className="text-white">{matchData.codigo}</span></span>
          
          {currentCard ? (
            <div className="animate-fade-in w-full max-w-sm bg-slate-950 border-2 border-emerald-500 rounded-3xl p-8 shadow-[0_0_40px_-10px_rgba(52,211,153,0.3)] mt-12 md:mt-0">
              <span className="text-8xl md:text-9xl block mb-6 drop-shadow-xl">{currentCard.fallbackEmoji}</span>
              <h3 className="text-3xl font-black text-white mb-2">{currentCard.name}</h3>
            </div>
          ) : (
            <div className="text-slate-500 animate-pulse text-lg font-medium py-20 mt-12 md:mt-0">Presiona el botón para iniciar</div>
          )}
        </div>
        
        {/* Panel de Botones */}
        <div className="w-full md:w-80 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-center gap-4 shadow-xl">
            <button 
              onClick={drawNextCard} disabled={deck.length === 0}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white px-6 py-5 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95 w-full"
            >
              {deck.length === 0 ? "Mazo Terminado" : "Sacar Siguiente Carta"}
            </button>
            <button 
              onClick={handleRestart}
              className="w-full bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              Volver a Comenzar
            </button>
            <button 
              onClick={handleEndGame}
              className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              Finalizar Partida
            </button>
        </div>
      </div>

      {/* ZONA INFERIOR: Historial Horizontal */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Historial de Cartas ({history.length})</h3>
        </div>
        {/* Aquí está el scroll horizontal tal cual lo pediste */}
        <div className="flex flex-row overflow-x-auto gap-4 py-2 px-1 rounded-2xl custom-scrollbar w-full">
          {history.map((card, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 w-28 h-36 bg-slate-950 border rounded-xl flex flex-col items-center justify-center p-3 transition-all ${
                i === 0 ? "border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105" : "border-slate-800"
              }`}
            >
              <span className="text-5xl filter drop-shadow-sm select-none mb-3">{card.fallbackEmoji}</span>
              <h4 className="text-xs font-bold text-slate-300 truncate w-full text-center">{card.name}</h4>
            </div>
          ))}
          {history.length === 0 && (
            <div className="w-full py-8 text-center text-xs text-slate-500 font-mono">No ha salido ninguna carta todavía.</div>
          )}
        </div>
      </div>
    </div>
  );
}