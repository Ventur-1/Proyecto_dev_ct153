import React from 'react';
// ¡Fíjate cómo ahora dice .jsx explícitamente!
import { conceptsData, ConceptImage } from '../data/concepts.jsx';

export default function DeckViewer() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in no-print">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold loteria-font text-white">Mazo Tecnológico</h2>
          <p className="text-slate-400 text-sm font-mono mt-1">Total de especímenes indexados: {conceptsData.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {conceptsData.map((concept) => (
          <div key={concept.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center shadow-lg group hover:border-blue-500/50 transition-all duration-300">
            <ConceptImage concept={concept} className="w-full aspect-square bg-slate-950 mb-3 group-hover:scale-102 transition-transform" />
            <h4 className="text-base font-bold text-slate-200 text-center truncate w-full">{concept.name}</h4>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md mt-2">{concept.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}