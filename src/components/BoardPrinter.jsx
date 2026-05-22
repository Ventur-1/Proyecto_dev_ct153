import React, { useState, useEffect } from 'react';
import { Grid, Printer } from 'lucide-react';
import { conceptsData } from '../data/concepts';

export default function BoardPrinter({ userImages }) {
  const [boardCount, setBoardCount] = useState(35);
  const [boards, setBoards] = useState([]);

  const generate = () => {
    const newBoards = [];
    for (let i = 0; i < boardCount; i++) {
      const shuffled = [...conceptsData].sort(() => 0.5 - Math.random());
      newBoards.push(shuffled.slice(0, 9));
    }
    setBoards(newBoards);
  };

  useEffect(() => {
    generate();
  }, [boardCount]);

  return (
    <div className="space-y-6">
      <div className="no-print bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Grid className="text-blue-600 w-5 h-5" /> Generador de Planillas
          </h3>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={boardCount}
            onChange={(e) => setBoardCount(e.target.value)}
            className="w-16 px-2 py-2 border rounded-lg text-center font-bold"
            min="1"
            max="60"
          />
          <button
            onClick={generate}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
          >
            Regenerar
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> PDF
          </button>
        </div>
      </div>

      <div className="print-container space-y-12">
        {boards.map((boardCards, bIdx) => (
          <div
            key={`board-${bIdx}`}
            className="board-page no-print-bg bg-white p-6 max-w-xl mx-auto border-4 border-slate-900 rounded-3xl mb-8"
          >
            <div className="flex justify-between items-center border-b-2 border-slate-900 pb-2 mb-3">
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 bg-blue-600 text-[8px] font-black text-white rounded">
                  REACT
                </span>
                <h4 className="text-sm font-black tracking-wider loteria-font text-slate-900">
                  LA LOTERÍA DEL DEV
                </h4>
              </div>
              <span className="text-[9px] font-black text-slate-400">
                TABLERO #{bIdx + 1}
              </span>
            </div>
            <div className="board-grid grid grid-cols-3 gap-2 border border-slate-200 p-1.5 bg-slate-50 rounded-xl overflow-hidden">
              {boardCards.map((concept) => {
                const imageSrc =
                  userImages[concept.id] ||
                  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8fafc"/><text x="50" y="55" font-family="Arial" font-size="30" text-anchor="middle" fill="%2394a3b8">${concept.fallbackEmoji}</text></svg>`;
                return (
                  <div
                    key={concept.id}
                    className="border border-slate-300 p-2 bg-white flex flex-col justify-between items-center text-center h-28 relative rounded-lg"
                  >
                    <span className="absolute top-1 left-1.5 text-[8.5px] font-black text-slate-300">
                      #{concept.id}
                    </span>
                    <div className="w-full h-16 flex items-center justify-center p-1">
                      <img
                        src={imageSrc}
                        className="object-contain max-h-full max-w-full"
                        alt="img"
                      />
                    </div>
                    <div className="w-full truncate text-[9px] font-black text-slate-800 loteria-font uppercase border-t border-slate-100 pt-1">
                      {concept.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
