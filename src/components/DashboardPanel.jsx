import React from 'react';
import {
  Terminal,
  CheckSquare,
  Printer,
  Info,
  Users,
  PlayCircle,
  ShieldCheck,
} from 'lucide-react';

// 👇 AQUÍ ESTÁ LA CORRECCIÓN CLAVE: export default
export default function DashboardPanel({ bitacora, setBitacora }) {
  return (
    <div className="space-y-8 print:block">
      <div className="no-print bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10">
          <Terminal className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
            Arquitectura React + Supabase
          </span>
          <h2 className="text-4xl md:text-5xl font-black loteria-font leading-tight">
            La Lotería del Dev
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Juego diseñado para tus alumnos de Programación.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="no-print lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="text-blue-600 w-5 h-5" /> Bitácora
          </h3>
          <div className="space-y-3">
            {Object.entries(bitacora).map(([key, value]) => (
              <label
                key={key}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setBitacora({ ...bitacora, [key]: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 text-blue-600"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase">
                    {key}
                  </h4>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 loteria-font">
                📜 Instructivo Oficial
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Reglas claras para el aula
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="no-print px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Imprimir
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-blue-600 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> Fundamental
                </h4>
                <p className="text-slate-600 text-xs mt-1">
                  El gritón dicta la pista divertida, no el nombre.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Grupo
                </h4>
                <p className="text-slate-600 text-xs mt-1">
                  Jugar en parejas o tercias para fomentar el debate.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4" /> Pasos
                </h4>
                <ol className="list-decimal list-inside text-xs text-slate-600 mt-1 space-y-1">
                  <li>Repartir planilla y frijoles.</li>
                  <li>Profesor inicia Modo Gritón.</li>
                  <li>Dictar pista (15 seg de debate).</li>
                  <li>Revelar concepto.</li>
                </ol>
              </div>
              <div>
                <h4 className="font-bold text-emerald-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Victoria
                </h4>
                <p className="text-slate-600 text-xs mt-1">
                  El primero en ganar grita "¡COMPILE!".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
