import React from 'react';
import { Printer } from 'lucide-react';
import { conceptsData } from '../data/concepts';

export default function DeckPrinter({ userImages }) {
  const pages = [];
  for (let i = 0; i < conceptsData.length; i += 4) {
    pages.push(conceptsData.slice(i, i + 4));
  }

  return (
    <div className="space-y-6">
      <div className="no-print bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Printer className="text-blue-600 w-5 h-5" /> Imprimir Cartas
          </h3>
        </div>
        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Generar PDF
        </button>
      </div>

      <div className="print-container">
        {pages.map((pageCards, pageIdx) => (
          <div
            key={`page-${pageIdx}`}
            className="print-deck-grid no-print-bg bg-white border border-slate-100 p-4 rounded-3xl mb-8"
          >
            {pageCards.map((concept) => {
              const imageSrc =
                userImages[concept.id] ||
                `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8fafc"/><text x="50" y="55" font-family="Arial" font-size="35" text-anchor="middle" fill="%2394a3b8">${concept.fallbackEmoji}</text></svg>`;
              return (
                <div
                  key={concept.id}
                  className="card-item border-2 border-slate-900 p-4 rounded-2xl flex flex-col justify-between h-[360px] max-w-[260px] mx-auto bg-white"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                      {concept.category}
                    </span>
                    <span className="text-xs font-black text-slate-400">
                      #{concept.id}
                    </span>
                  </div>
                  <div className="my-3 h-28 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden p-2 border border-dashed border-slate-200">
                    <img
                      src={imageSrc}
                      className="object-contain max-h-full max-w-full"
                      alt="img"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-base font-black text-slate-900 loteria-font uppercase tracking-tight">
                      {concept.name}
                    </h4>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-center">
                    <p className="text-[9px] text-slate-500 italic">
                      "{concept.clue}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
