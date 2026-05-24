import React, { useState, useEffect } from 'react';
import { Volume2, RefreshCcw, Grid } from 'lucide-react';
// Importaciones explícitas para evitar errores de Vite
import { conceptsData, ConceptImage } from '../data/concepts.jsx';
import { shuffleDeck } from '../utils/gameHelpers.js';

export default function GameGriton() {
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setDeck(shuffleDeck(conceptsData));
  }, []);

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      if (!showCard && currentIndex !== -1) setShowCard(true);
      else { setCurrentIndex(prev => prev + 1); setShowCard(false); }
    }
  };

  const isGameOver = currentIndex >= deck.length - 1 && showCard;
  const currentConcept = deck[currentIndex];
  const history = deck.slice(0, currentIndex).reverse();

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-full max-w-7xl mx-auto no-print animate-fade-in">
      <div className="flex-1 bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl flex flex-col items-center min-h-[65vh] justify-center relative">
        {currentIndex === -1 ? (
          <div className="text-center space-y-6">
            <Volume2 className="w-20 h-20 text-emerald-400 mx-auto animate-pulse" />
            <h2 className="text-4xl font-bold loteria-font text-white">Modo Gritón Listo</h2>
            <button onClick={handleNext} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3.5 rounded-xl font-bold text-lg transition-all shadow-lg hover:scale-105">Iniciar Partida</button>
          </div>
        ) : isGameOver ? (
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold loteria-font text-emerald-400">Fin de la Baraja</h2>
            <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto transition-all"><RefreshCcw className="w-4 h-4"/> Volver a Barajar</button>
          </div>
        ) : (
          <div className="w-full max-w-xl text-center space-y-8">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 min-h-[140px] flex items-center justify-center">
               <h3 className="text-2xl font-medium text-amber-200/90 leading-relaxed">"{currentConcept?.clue}"</h3>
            </div>
            <div className={`transition-all duration-500 ease-out transform ${showCard ? 'scale-100 opacity-100' : 'scale-95 opacity-0 h-0 overflow-hidden'}`}>
                {currentConcept && (
                  <div className="bg-slate-100 p-5 rounded-[2rem] shadow-2xl mx-auto w-72 border-[10px] border-emerald-500 rotate-1">
                    <ConceptImage concept={currentConcept} className="h-56 mb-4 bg-slate-200" />
                    <h2 className="text-3xl font-black loteria-font text-slate-900 uppercase tracking-tight">{currentConcept.name}</h2>
                    <span className="inline-block mt-2 px-3 py-1 bg-slate-800 text-emerald-400 font-bold rounded-full text-[10px] uppercase tracking-widest">{currentConcept.category}</span>
                  </div>
                )}
            </div>
            <button onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">{!showCard ? 'Revelar Concepto' : 'Siguiente Pista'}</button>
          </div>
        )}
      </div>

      <div className="w-full xl:w-80 bg-slate-900 rounded-[2.5rem] p-6 border border-slate-800 max-h-[65vh] overflow-y-auto">
        <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-widest"><Grid className="w-4 h-4"/> Pasadas ({history.length})</h3>
        <div className="grid grid-cols-2 gap-3">
          {history.map((card, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
               <ConceptImage concept={card} className="w-12 h-12 rounded-lg bg-slate-900" />
               <p className="text-[10px] font-bold text-slate-300 truncate w-full text-center mt-2">{card.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}