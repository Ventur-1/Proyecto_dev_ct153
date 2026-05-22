import React from 'react';
import { ImagePlus, UploadCloud } from 'lucide-react';
import { conceptsData } from '../data/concepts';

export default function ImageManager({ userImages, setUserImages }) {
  const handleSingleUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setUserImages((prev) => ({ ...prev, [id]: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleBulkUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const cleanName = file.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const match = conceptsData.find((c) => {
        const cleanConcept = c.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return (
          cleanName.includes(cleanConcept) ||
          cleanConcept.includes(cleanName.split('.')[0])
        );
      });
      if (match) {
        const reader = new FileReader();
        reader.onload = (ev) =>
          setUserImages((prev) => ({ ...prev, [match.id]: ev.target.result }));
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ImagePlus className="text-blue-600 w-5 h-5" /> Banco de
            Ilustraciones
          </h3>
        </div>
        <div className="flex gap-2">
          <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5">
            <UploadCloud className="w-4 h-4" /> Carga Masiva
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleBulkUpload}
            />
          </label>
          <button
            onClick={() => setUserImages({})}
            className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
          >
            Limpiar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {conceptsData.map((concept) => {
          const imageSrc =
            userImages[concept.id] ||
            `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f1f5f9"/><text x="50" y="55" font-family="Arial" font-size="36" text-anchor="middle" fill="%2394a3b8">${concept.fallbackEmoji}</text></svg>`;
          return (
            <div
              key={concept.id}
              className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex flex-col items-center text-center space-y-2"
            >
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={imageSrc}
                  className="object-contain w-full h-full p-1"
                  alt={concept.name}
                />
              </div>
              <div className="w-full">
                <span className="text-[9px] font-black text-slate-400 block">
                  #{concept.id}
                </span>
                <span className="text-xs font-bold text-slate-800 block truncate w-full">
                  {concept.name}
                </span>
              </div>
              <label className="w-full py-1 bg-white hover:bg-slate-100 text-[10px] font-semibold rounded-md border border-slate-200 text-slate-700 cursor-pointer block">
                Subir Foto
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleSingleUpload(e, concept.id)}
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
