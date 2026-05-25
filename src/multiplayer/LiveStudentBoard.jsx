import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { generateUniqueBoards } from '../utils/gameHelpers.js';
import { conceptsData } from '../data/concepts.jsx'; 

export default function LiveStudentBoard({ matchData }) {
  // Memorias en el alumno para no perder su progreso
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem(`student_board_${matchData.codigo}`);
    if (savedBoard) return JSON.parse(savedBoard);
    const myBoard = generateUniqueBoards(1, conceptsData)[0];
    return myBoard;
  });

  const [markedCards, setMarkedCards] = useState(() => {
    const savedMarked = localStorage.getItem(`student_marked_${matchData.codigo}`);
    return savedMarked ? JSON.parse(savedMarked) : [];
  });

  const [revealedCardsIds, setRevealedCardsIds] = useState(() => {
    const savedRevealed = localStorage.getItem(`student_revealed_${matchData.codigo}`);
    return savedRevealed ? JSON.parse(savedRevealed) : [];
  });

  const [hasWon, setHasWon] = useState(() => localStorage.getItem(`student_hasWon_${matchData.codigo}`) === 'true');
  
  const [toastMsg, setToastMsg] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    localStorage.setItem(`student_board_${matchData.codigo}`, JSON.stringify(board));
    localStorage.setItem(`student_marked_${matchData.codigo}`, JSON.stringify(markedCards));
    localStorage.setItem(`student_revealed_${matchData.codigo}`, JSON.stringify(revealedCardsIds));
    localStorage.setItem(`student_hasWon_${matchData.codigo}`, hasWon);
  }, [board, markedCards, revealedCardsIds, hasWon, matchData.codigo]);

  useEffect(() => {
    const channel = supabase.channel(`partida-${matchData.codigo}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'partidas', filter: `codigo=eq.${matchData.codigo}` }, 
      (payload) => {
        if (payload.new.estado === 'finalizada') {
          alert("El profesor ha finalizado la partida.");
          localStorage.removeItem(`student_code`);
          localStorage.removeItem(`student_joinedMatch`);
          localStorage.removeItem(`student_isPlaying`);
          localStorage.removeItem(`student_board_${matchData.codigo}`);
          localStorage.removeItem(`student_marked_${matchData.codigo}`);
          localStorage.removeItem(`student_revealed_${matchData.codigo}`);
          localStorage.removeItem(`student_hasWon_${matchData.codigo}`);
          window.location.reload(); 
        }
        
        const nuevasCartas = payload.new.cartas_reveladas || [];
        setRevealedCardsIds(nuevasCartas);

        if (nuevasCartas.length === 0) {
          setMarkedCards([]);
          setHasWon(false);
          showNotification("El profesor ha reiniciado la partida.");
        }
      }).subscribe();

    return () => supabase.removeChannel(channel);
  }, [matchData.codigo]);

  const showNotification = (message) => {
    setToastMsg(message);
    setIsFadingOut(false);
    setTimeout(() => setIsFadingOut(true), 2500);
    setTimeout(() => setToastMsg(null), 3000); 
  };

  const toggleMark = (cardId, cardName) => {
    if (revealedCardsIds.includes(cardId)) {
      if (markedCards.includes(cardId)) {
        setMarkedCards(markedCards.filter(id => id !== cardId)); 
      } else {
        setMarkedCards([...markedCards, cardId]); 
      }
    } else {
      showNotification(`La carta "${cardName}" aún no ha salido.`);
    }
  };

  const checkWin = () => {
    const won = board.every(card => markedCards.includes(card.id));
    if (won) {
      setHasWon(true);
    } else {
      showNotification("¡Aún te faltan cartas por marcar!");
    }
  };

  const currentCardId = revealedCardsIds.length > 0 ? revealedCardsIds[0] : null;
  const currentCard = currentCardId ? conceptsData.find(c => c.id === currentCardId) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 relative animate-fade-in no-print">
      
      {toastMsg && (
        <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 bg-slate-800/95 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-[0_10px_50px_rgba(0,0,0,0.5)] border border-slate-700 z-50 flex items-center gap-4 transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 text-lg font-bold">!</div>
          <p className="font-bold text-base tracking-wide">{toastMsg}</p>
        </div>
      )}

      {hasWon && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="text-7xl md:text-9xl font-black text-emerald-400 animate-bounce loteria-font drop-shadow-[0_0_40px_rgba(52,211,153,1)] tracking-widest">
            ¡LOTERÍA!
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-emerald-400 mb-2">Tu Planilla Oficial</h2>
        <p className="text-slate-400">Código de partida: <span className="text-white font-bold">{matchData.codigo}</span></p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center justify-center shadow-xl">
          <h3 className="text-slate-400 font-bold mb-6 text-sm uppercase tracking-widest">Carta Actual</h3>
          {currentCard ? (
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-700 shadow-inner w-full flex flex-col items-center text-center transform transition-all scale-105">
              <span className="text-8xl block mb-6 drop-shadow-xl">{currentCard.fallbackEmoji}</span>
              <h4 className="text-2xl text-white font-black">{currentCard.name}</h4>
            </div>
          ) : (
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 border-dashed w-full flex flex-col items-center text-center opacity-50 py-12">
              <span className="text-4xl block mb-4">⏳</span>
              <p className="text-slate-500 font-medium">Esperando al profesor...</p>
            </div>
          )}
        </div>

        <div className="lg:w-2/3 bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
            {board.map((card) => {
              const isMarked = markedCards.includes(card.id);
              return (
                <button 
                  key={card.id} 
                  onClick={() => toggleMark(card.id, card.name)}
                  className={`relative cursor-pointer transition-all duration-300 p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center text-center border-2 
                    ${isMarked 
                      ? 'bg-slate-900 border-emerald-500 scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                      : 'bg-slate-950 border-slate-700 hover:border-emerald-500 hover:scale-105 shadow-lg'}`}
                >
                  <span className={`text-4xl sm:text-5xl mb-2 z-10 transition-transform hover:scale-110 ${isMarked ? 'grayscale opacity-60' : ''}`}>
                    {card.fallbackEmoji}
                  </span>
                  
                  <h4 className={`text-[10px] sm:text-[11px] font-bold leading-tight z-10 ${isMarked ? 'text-emerald-500' : 'text-slate-200'}`}>
                    {card.name}
                  </h4>
                  
                  {isMarked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center rounded-xl z-20">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] opacity-90 animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button 
            onClick={checkWin}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-5 rounded-2xl font-black text-2xl transition-all shadow-xl active:scale-95 tracking-widest"
          >
            ¡COMPROBAR LOTERÍA!
          </button>
        </div>
      </div>
    </div>
  );
}