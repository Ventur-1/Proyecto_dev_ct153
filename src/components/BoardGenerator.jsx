import React, { useState } from 'react';
import { Printer, Grid, RefreshCw } from 'lucide-react';
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
      
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 no-print shadow-xl">
        <div className="flex items-center gap-4">
          <label className="text-sm font-bold text-slate-300">Cantidad de Planillas Únicas:</label>
          <input 
            type="number" min="1" max="20" value={boardCount} onChange={(e) => setBoardCount(e.target.value)} 
            className="bg-slate-950 border border-slate-700 text-white font-bold rounded-xl px-4 py-2 w-20 text-center focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={handleGenerate} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 active:scale-95">
            <RefreshCw className="w-5 h-5" /> Generar
          </button>
          {generatedBoards.length > 0 && (
            <button onClick={() => window.print()} className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all border border-slate-700 flex items-center gap-2 active:scale-95">
              <Printer className="w-5 h-5 text-emerald-400" /> Imprimir
            </button>
          )}
        </div>
      </div>

      {generatedBoards.length === 0 ? (
        <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center bg-slate-900/50 no-print">
          <Grid className="w-16 h-16 mx-auto text-slate-700 mb-4" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">Aún no hay planillas</h3>
          <p className="text-slate-500">Selecciona cuántas necesitas y presiona Generar.</p>
        </div>
      ) : (
        <div className="space-y-12 print:space-y-0 print:block">
          {generatedBoards.map((board, bIdx) => (
            // AQUI ESTA LA MAGIA: h-[95vh] y page-break-after-always garantizan 1 planilla exacta sin recortes
            <div key={bIdx} className="bg-slate-900 p-6 rounded-[2.5rem] border border-slate-800 shadow-2xl print:bg-white print:border-none print:shadow-none print:m-0 print:p-6 print:w-full print:h-[95vh] print:flex print:flex-col print:justify-center print:page-break-after-always print:break-inside-avoid">
              
              <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3 print:border-black print:mb-8">
                <h3 className="text-3xl font-bold loteria-font text-white print:text-black">Planilla del Dev #00{bIdx + 1}</h3>
                <span className="text-sm font-mono text-emerald-400 font-bold print:text-slate-600">Código: UNIQUE-{bIdx + 104}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 print:gap-4 print:flex-grow">
                {board.map((card) => (
                  <div key={card.id} className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex flex-col items-center justify-center text-center print:bg-white print:border-2 print:border-black print:h-full">
                    <ConceptImage concept={card} className="w-3/4 aspect-square bg-slate-900 mb-3 print:bg-white" />
                    <h4 className="text-[10px] sm:text-xs font-bold text-slate-200 leading-tight print:text-black">{card.name}</h4>
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