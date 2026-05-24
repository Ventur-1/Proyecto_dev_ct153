import React, { useState } from 'react';
import { Printer, Grid, RefreshCw } from 'lucide-react';
// Importaciones explícitas para evitar errores de Vite
import { conceptsData, ConceptImage } from '../data/concepts.jsx';
import { generateUniqueBoards } from '../utils/gameHelpers.js';

export default function BoardGenerator() {
  const [boardCount, setBoardCount] = useState(4);
  const [generatedBoards, setGeneratedBoards] = useState([]);

  const handleGenerate = () => {
    const boards = generateUniqueBoards(Number(boardCount), conceptsData);
    setGeneratedBoards(boards);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* PANEL DE CONTROL NO IMPRIMIBLE */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 no-print shadow-xl">
        <div className="flex items-center gap-4">
          <label className="text-sm font-bold text-slate-300">Cantidad de Planillas Únicas:</label>
          <input type="number" min="1" max="20" value={boardCount} onChange={(e) => setBoardCount(e.target.value)} className="bg-slate-950 border border-slate-700 text-white font-bold rounded-xl px-4 py-2 w-20 text-center focus:border-emerald-500 outline-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm transition-all shadow-lg shadow-blue-900/20">
            <RefreshCw className="w-4 h-4" /> Crear Tableros
          </button>
          {generatedBoards.length > 0 && (
            <button onClick={() => window.print()} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm transition-all shadow-lg shadow-emerald-500/20">
              <Printer className="w-4 h-4" /> Imprimir Planillas
            </button>
          )}
        </div>
      </div>

      {/* ÁREA DE RENDERIZADO E IMPRESIÓN */}
      {generatedBoards.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 border border-slate-800 rounded-3xl border-dashed no-print">
          <Grid className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <p className="text-slate-500">Define una cantidad y haz clic en "Crear Tableros" para estructurar tus planillas de juego.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {generatedBoards.map((board, bIdx) => (
            <div key={bIdx} className="bg-slate-900 p-6 rounded-[2.5rem] border border-slate-800 shadow-2xl page-break-after print:bg-white print:border-none print:shadow-none print:p-0">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3 print:border-slate-900">
                <h3 className="text-xl font-bold loteria-font text-white print:text-black">Planilla del Dev #00{bIdx + 1}</h3>
                <span className="text-xs font-mono text-emerald-400 font-bold print:text-slate-600">Código: UNIQUE-{bIdx + 104}</span>
              </div>
              <div className="grid grid-cols-4 gap-3 print:gap-2">
                {board.map((card) => (
                  <div key={card.id} className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl flex flex-col items-center justify-between text-center print:bg-white print:border-2 print:border-black">
                    <ConceptImage concept={card} className="w-full aspect-square bg-slate-900 mb-2 print:bg-slate-100" />
                    <p className="text-[11px] font-black uppercase tracking-tight text-slate-200 truncate w-full print:text-black">{card.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}