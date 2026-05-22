import React, { useState } from 'react';
import { Radio, Shuffle, ArrowRight, HelpCircle, Terminal } from 'lucide-react';
import { conceptsData } from '../data/concepts';

export default function GameMode({ userImages }) {
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [revealed, setRevealed] = useState(false);

  const startGame = () => {
    setDeck([...conceptsData].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setRevealed(false);
  };

  const nextCard = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRevealed(false);
    }
  };

  const currentConcept = deck[currentIndex];
  const progress =
    deck.length > 0 ? ((currentIndex + 1) / deck.length) * 100 : 0;
  const history = deck.slice(0, currentIndex).reverse();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 no-print">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 h-fit">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Radio className="text-emerald-500 animate-pulse w-5 h-5" /> Mesa de
          Control
        </h3>
        <div className="space-y-3">
          <button
            onClick={startGame}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
          >
            <Shuffle className="w-4 h-4" /> Barajar Mazo
          </button>
          <button
            onClick={nextCard}
            disabled={currentIndex === -1 || currentIndex >= deck.length - 1}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 font-bold rounded-xl transition flex justify-center gap-2 items-center"
          >
            Siguiente Pista <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="border-t border-slate-100 pt-4 space-y-4">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <div className="grid grid-cols-4 gap-2">
            {history.map((c) => {
              const src =
                userImages[c.id] ||
                `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8fafc"/><text x="50" y="55" font-family="Arial" font-size="35" text-anchor="middle" fill="%2394a3b8">${c.fallbackEmoji}</text></svg>`;
              return (
                <div
                  key={c.id}
                  className="bg-slate-900 rounded-xl p-1.5 flex flex-col items-center"
                >
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-0.5">
                    <img
                      src={src}
                      className="object-contain max-h-full"
                      alt="hist"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-slate-950 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between min-h-[520px] relative">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5">
          <Terminal className="w-80 h-80 text-blue-500" />
        </div>
        <div className="my-auto py-8 text-center space-y-6 z-10">
          {!currentConcept ? (
            <div className="text-slate-500 text-lg italic">
              Presiona "Barajar Mazo" para iniciar
            </div>
          ) : !revealed ? (
            <div className="space-y-6 animate-pulse">
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl mx-auto flex items-center justify-center text-emerald-500">
                <HelpCircle className="w-10 h-10" />
              </div>
              <p className="text-xl md:text-3xl font-black text-slate-100 max-w-xl mx-auto italic leading-relaxed">
                "{currentConcept.clue}"
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-36 h-36 bg-white rounded-3xl mx-auto flex items-center justify-center p-2 border-2 border-emerald-500">
                <img
                  src={
                    userImages[currentConcept.id] ||
                    `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8fafc"/><text x="50" y="55" font-family="Arial" font-size="35" text-anchor="middle" fill="%2394a3b8">${currentConcept.fallbackEmoji}</text></svg>`
                  }
                  className="object-contain max-h-full"
                  alt="rev"
                />
              </div>
              <h2 className="text-4xl font-black loteria-font uppercase">
                {currentConcept.name}
              </h2>
              <div className="px-4 py-2 bg-slate-900 rounded-xl inline-block border border-slate-800">
                <p className="text-xs text-slate-400">
                  "{currentConcept.clue}"
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center border-t border-slate-900 pt-4 z-10">
          <button
            onClick={() => setRevealed(true)}
            disabled={!currentConcept || revealed}
            className="px-5 py-2 bg-blue-600/20 text-blue-300 rounded-lg text-xs font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Revelar Concepto
          </button>
        </div>
      </div>
    </div>
  );
}
