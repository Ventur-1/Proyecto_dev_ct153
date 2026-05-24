// Archivo: src/components/Instructions.jsx
import React from 'react';
import { CheckCircle2, Printer } from 'lucide-react';

export default function Instructions() {
  const steps = [
    { title: "Reparto de Elementos", desc: "Cada estudiante o equipo recibe una planilla impresa de 4x4 y fichas (o frijoles) para marcar." },
    { title: "El Proyector Activo", desc: "El docente inicia el 'Modo Gritón' en pantalla grande para controlar los tiempos." },
    { title: "Lectura de Pistas", desc: "El sistema arroja una descripción técnica. Los alumnos debaten qué componente cubre esa pista." },
    { title: "Revelación y Marcado", desc: "Al revelar la carta, quienes la tengan en su planilla colocan un marcador sobre ella." },
    { title: "Victoria Segura", desc: "El primer jugador en llenar la planilla por completo debe gritar con fuerza: ¡COMPILE! para ganar." }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
        <button onClick={() => window.print()} className="absolute top-6 right-6 bg-slate-800 text-slate-300 hover:text-white p-3 rounded-xl border border-slate-700 transition flex items-center gap-2 text-sm font-bold no-print">
          <Printer className="w-4 h-4" /> Imprimir Instructivo
        </button>

        <h2 className="text-4xl font-bold loteria-font mb-2 text-emerald-400">Reglamento Técnico del Juego</h2>
        <p className="text-slate-400 font-light mb-8">Una dinámica educativa diseñada para asimilar conceptos de Hardware, Software y Redes.</p>
        
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 items-start border-l-2 border-slate-800 pl-4 hover:border-emerald-500 transition-colors py-1">
              <CheckCircle2 className="text-emerald-500 shrink-0 w-6 h-6 mt-0.5" />
              <div>
                <h4 className="text-lg font-bold text-slate-200">{idx + 1}. {step.title}</h4>
                <p className="text-slate-400 font-light mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}