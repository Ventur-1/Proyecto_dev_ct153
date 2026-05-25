import React from 'react';
import { Printer } from 'lucide-react';
import { conceptsData, ConceptImage } from '../data/concepts.jsx';

export default function DeckViewer() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center no-print">
        <div>
          <h2 className="text-3xl font-bold loteria-font text-white">Mazo Tecnológico</h2>
          <p className="text-slate-400 text-sm font-mono mt-1">Total de especímenes indexados: {conceptsData.length}</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95"
        >
          <Printer className="w-5 h-5" />
          Imprimir Mazo
        </button>
      </div>

      {/* CLASES CLAVE PARA IMPRIMIR 6 POR HOJA: print:grid-cols-3 y print:h-[45vh] */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 print:grid-cols-3 print:gap-6 print:p-4">
        {conceptsData.map((concept) => (
          <div key={concept.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg group hover:border-blue-500/50 transition-all duration-300 print:h-[45vh] print:border-black print:border-2 print:bg-white print:shadow-none print:break-inside-avoid">
            <ConceptImage concept={concept} className="w-full aspect-square bg-slate-950 mb-3 group-hover:scale-105 transition-transform print:bg-white" />
            <h4 className="text-xl font-bold text-slate-200 text-center truncate w-full print:text-black">{concept.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}