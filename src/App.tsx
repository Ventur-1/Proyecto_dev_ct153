import React, { useState, useEffect } from 'react';
import {
  Terminal,
  LayoutDashboard,
  ImagePlus,
  Layers,
  Grid,
  Play,
  CheckSquare,
  Printer,
  Info,
  Users,
  PlayCircle,
  ShieldCheck,
  UploadCloud,
  Radio,
  Shuffle,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

// --- DATA: Los 39 Conceptos (Importados directamente para evitar errores de módulo) ---
const conceptsData = [
  {
    id: 1,
    name: 'La USB',
    category: 'Hardware',
    clue: '¡El llavero tecnológico! Pequeña memoria portátil para llevar tus proyectos, códigos y tareas de una computadora a otra.',
    fallbackEmoji: '📟',
  },
  {
    id: 2,
    name: 'La RAM',
    category: 'Hardware',
    clue: '¡La de la memoria corta! Se activa cuando prendes la computadora para cargar tus programas rápido, pero si se apaga, lo olvida todo.',
    fallbackEmoji: '🧠',
  },
  {
    id: 3,
    name: 'El gabinete',
    category: 'Hardware',
    clue: '¡La coraza de metal! La caja protectora de todos los componentes internos de la computadora, el escudo contra el polvo.',
    fallbackEmoji: '🖥️',
  },
  {
    id: 4,
    name: 'El monitor',
    category: 'Hardware',
    clue: '¡La ventana de luz! La pantalla que te muestra con colores lo que está haciendo tu procesador.',
    fallbackEmoji: '📺',
  },
  {
    id: 5,
    name: 'El mause',
    category: 'Hardware',
    clue: '¡El ratón con cable! Lo mueves con la mano para desplazar la flecha por toda la pantalla y hacer clics.',
    fallbackEmoji: '🖱',
  },
  {
    id: 6,
    name: 'El explorador de archivos',
    category: 'Software',
    clue: '¡El archivero de carpetas! La ventana de Windows donde organizas tus descargas, fotos y códigos.',
    fallbackEmoji: '📂',
  },
  {
    id: 7,
    name: 'La laptop',
    category: 'Hardware',
    clue: '¡La mochila digital! Tu computadora portátil lista para programar y hacer tus prácticas desde cualquier banca o cafetería.',
    fallbackEmoji: '💻',
  },
  {
    id: 8,
    name: 'La base de datos',
    category: 'Software',
    clue: '¡El gran almacén ordenado! Donde se guardan estructuradamente miles de datos, como los nombres y contraseñas de tus usuarios.',
    fallbackEmoji: '🗄️',
  },
  {
    id: 9,
    name: 'El teclado',
    category: 'Hardware',
    clue: '¡El escritor infatigable! Tiene letras de la A a la Z y símbolos raros para que teclees todo tu código.',
    fallbackEmoji: '⌨️',
  },
  {
    id: 10,
    name: 'Las variables',
    category: 'Programación',
    clue: '¡La caja de sorpresas! Espacio con un nombre donde guardas un dato que puede cambiar durante la ejecución del programa.',
    fallbackEmoji: '📦',
  },
  {
    id: 11,
    name: 'La terminal',
    category: 'Software',
    clue: '¡La pantalla negra de hacker! No hay íconos ni mouse; aquí das órdenes puras tecleando comandos de texto.',
    fallbackEmoji: '💻',
  },
  {
    id: 12,
    name: 'Las clases',
    category: 'Programación',
    clue: '¡El molde para galletas! En programación, la plantilla que define cómo serán tus futuros objetos con sus propiedades.',
    fallbackEmoji: '🏗️',
  },
  {
    id: 13,
    name: 'El CPU',
    category: 'Hardware',
    clue: '¡El cerebro pensante! El chip central que procesa cada cálculo matemático y orden lógica que ejecutas.',
    fallbackEmoji: '🎛️',
  },
  {
    id: 14,
    name: 'La fuente de poder',
    category: 'Hardware',
    clue: '¡El corazón eléctrico! Transforma el voltaje de la pared en la energía segura que necesita tu computadora para no quemarse.',
    fallbackEmoji: '🔌',
  },
  {
    id: 15,
    name: 'El disipador de calor',
    category: 'Hardware',
    clue: '¡El ventilador de emergencia! Se pone sobre el procesador para mantenerlo fresco cuando trabajas en tus prácticas pesadas.',
    fallbackEmoji: '❄️',
  },
  {
    id: 16,
    name: 'El proyector',
    category: 'Hardware',
    clue: '¡El cine del salón! El dispositivo que hace gigante tu pantalla en la pared para que todos tus compañeros vean tu código.',
    fallbackEmoji: '📽️',
  },
  {
    id: 17,
    name: 'El C++',
    category: 'Programación',
    clue: '¡El clásico rudo de los lenguajes! Es súper veloz y el preferido para aprender estructuras lógicas reales en primer semestre.',
    fallbackEmoji: '👾',
  },
  {
    id: 18,
    name: 'La webcam',
    category: 'Hardware',
    clue: '¡El ojo del internet! Te permite capturar video en vivo para tus reuniones virtuales o clases en línea.',
    fallbackEmoji: '📷',
  },
  {
    id: 19,
    name: 'El error de capa 8',
    category: 'Soporte',
    clue: '¡El clásico descuido humano! Cuando todo el hardware y software sirven perfecto, pero el que se equivoca es el usuario.',
    fallbackEmoji: '🤦',
  },
  {
    id: 20,
    name: 'El cable RJ45',
    category: 'Redes',
    clue: '¡La manguera de datos! El cable con conector de patita plástica que te da la conexión de internet más veloz y estable.',
    fallbackEmoji: '🔌',
  },
  {
    id: 21,
    name: 'La IP´S',
    category: 'Redes',
    clue: '¡La dirección de tu casa digital! El número único de red de tu computadora para que internet sepa a dónde enviar tus datos.',
    fallbackEmoji: '🌐',
  },
  {
    id: 22,
    name: 'Los diagramas de flujo',
    category: 'Programación',
    clue: '¡El plano gráfico! Dibujos con rombos, rectángulos y flechas que muestran la lógica exacta de un algoritmo.',
    fallbackEmoji: '📊',
  },
  {
    id: 23,
    name: 'El wifi',
    category: 'Redes',
    clue: '¡Las ondas mágicas! El internet invisible que vuela por el aire de la escuela y del cual todos piden la contraseña.',
    fallbackEmoji: '📶',
  },
  {
    id: 24,
    name: 'La paquetería de Office 365',
    category: 'Software',
    clue: '¡El kit del estudiante! Word, Excel y PowerPoint reunidos para hacer tus reportes, presupuestos y exposiciones.',
    fallbackEmoji: '📎',
  },
  {
    id: 25,
    name: 'Los drivers',
    category: 'Soporte',
    clue: '¡Los traductores oficiales! Pequeños programas que le enseñan a tu computadora cómo usar un accesorio nuevo, como una impresora.',
    fallbackEmoji: '⚙️',
  },
  {
    id: 26,
    name: 'El navegador web',
    category: 'Software',
    clue: '¡Tu nave al internet! Google Chrome, Edge o Firefox; el programa que abres para buscar información o ver tutoriales.',
    fallbackEmoji: '🌐',
  },
  {
    id: 27,
    name: 'Los antivirus',
    category: 'Software',
    clue: '¡Los escudos digitales! Programas guardianes que patrullan tu sistema en busca de archivos dañinos o hackers.',
    fallbackEmoji: '🛡️',
  },
  {
    id: 28,
    name: 'El administrador de tareas',
    category: 'Software',
    clue: '¡El soplón de procesos! Lo abres con Ctrl+Alt+Supr para ver qué programa se congeló y cerrarlo a la fuerza.',
    fallbackEmoji: '🛑',
  },
  {
    id: 29,
    name: 'El router',
    category: 'Redes',
    clue: '¡El director de tránsito de la red! Recibe el internet y decide cómo enviárselo a las computadoras y celulares del salón.',
    fallbackEmoji: '🌐',
  },
  {
    id: 30,
    name: 'El almacenamiento',
    category: 'Hardware',
    clue: '¡La memoria que no olvida! Disco duro o SSD donde se guardan tus sistemas operativos y archivos de manera permanente.',
    fallbackEmoji: '💾',
  },
  {
    id: 31,
    name: 'El JavaScript',
    category: 'Programación',
    clue: '¡El dinamitador web! El lenguaje de programación que le da movimiento, efectos y vida a las páginas de internet.',
    fallbackEmoji: '🌐',
  },
  {
    id: 32,
    name: 'La tarjeta madre',
    category: 'Hardware',
    clue: '¡La placa base del imperio! El circuito gigante donde se conectan absolutamente todos los componentes de la computadora.',
    fallbackEmoji: '📟',
  },
  {
    id: 33,
    name: 'Los periféricos',
    category: 'Hardware',
    clue: '¡Los invitados externos! Todo aparato que conectas por fuera: bocinas, diademas de juego, impresoras o USBs.',
    fallbackEmoji: '🎧',
  },
  {
    id: 34,
    name: 'El procesador',
    category: 'Hardware',
    clue: '¡El motor principal! Ejecuta millones de instrucciones por segundo; si es potente, tus compilaciones y juegos vuelan.',
    fallbackEmoji: '⚡',
  },
  {
    id: 35,
    name: 'El Linux',
    category: 'Software',
    clue: '¡El pingüino del desarrollo! Sistema operativo libre y potente que dominan los verdaderos programadores y administradores.',
    fallbackEmoji: '🐧',
  },
  {
    id: 36,
    name: 'El Windows',
    category: 'Software',
    clue: '¡Las ventanas de siempre! El sistema operativo de escritorio más popular, conocido por su facilidad y actualizaciones sorpresa.',
    fallbackEmoji: '🪟',
  },
  {
    id: 37,
    name: 'El algoritmo',
    category: 'Programación',
    clue: '¡El instructivo paso a paso! La serie ordenada y finita de instrucciones que sigues para resolver cualquier reto de código.',
    fallbackEmoji: '📝',
  },
  {
    id: 38,
    name: 'El Xampp',
    category: 'Software',
    clue: '¡El combo del servidor web! Paquete de herramientas que instala localmente un servidor Apache y MySQL para tus bases de datos.',
    fallbackEmoji: '📦',
  },
  {
    id: 39,
    name: 'La documentación',
    category: 'Soporte',
    clue: '¡Las instrucciones del desarrollador! Texto donde detallas qué hace tu código para que tus compañeros no se pierdan.',
    fallbackEmoji: '📖',
  },
];

// --- COMPONENTES INTERNOS ---

const DashboardPanel = ({ bitacora, setBitacora }) => (
  <div className="space-y-8 print:block">
    <div className="no-print bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10">
        <Terminal className="w-96 h-96" />
      </div>
      <div className="relative z-10 max-w-3xl space-y-4">
        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
          Arquitectura React + Tailwind
        </span>
        <h2 className="text-4xl md:text-5xl font-black loteria-font leading-tight">
          La Lotería del Dev
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Un juego diseñado para relacionar a tus alumnos con los términos de
          hardware, redes, bases de datos y software.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="no-print lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckSquare className="text-blue-600 w-5 h-5" /> Bitácora (React
          State)
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
                <p className="text-[10px] text-slate-500">
                  Estado guardado en memoria local.
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900 loteria-font">
              📜 Instructivo Oficial de Juego
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Reglas claras y dinámicas adaptadas para el aula
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="no-print px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-blue-600 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> El Concepto Fundamental
              </h4>
              <p className="text-slate-600 text-xs mt-1">
                Para que los alumnos asimilen los nombres, las cartas no se
                "cantan" diciendo el nombre de golpe. El gritón dicta la pista
                divertida.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Estructura del Grupo
              </h4>
              <p className="text-slate-600 text-xs mt-1">
                Recomendado para jugar en parejas o tercias. Esto fomenta la
                discusión técnica y hace que el juego sea sumamente interactivo.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" /> Pasos para Jugar
              </h4>
              <ol className="list-decimal list-inside text-xs text-slate-600 mt-1 space-y-1">
                <li>Se reparte planilla y frijoles a cada equipo.</li>
                <li>El profesor inicia el Modo Gritón digital.</li>
                <li>Se dicta la pista y hay 15 segundos de debate.</li>
                <li>Se revela el concepto para marcar la planilla.</li>
              </ol>
            </div>
            <div>
              <h4 className="font-bold text-emerald-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Cómo ganar
              </h4>
              <p className="text-slate-600 text-xs mt-1">
                El primero en llenar el patrón requerido grita "¡COMPILE!". Si
                hay error de marcado, se declara "Error de Capa 8".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ImageManager = ({ userImages, setUserImages }) => {
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
          <p className="text-xs text-slate-500 mt-1">
            Sube tus fotos para asignarlas a las cartas.
          </p>
        </div>
        <div className="flex gap-2">
          <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 transition">
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
            Limpiar Imágenes
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
};

const DeckPrinter = ({ userImages }) => {
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
                    <h4 className="text-base font-black text-slate-900 loteria-font leading-tight uppercase tracking-tight">
                      {concept.name}
                    </h4>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-center">
                    <p className="text-[9px] text-slate-500 leading-tight italic">
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
};

const BoardPrinter = ({ userImages }) => {
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
                  DEV
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
};

const GameMode = ({ userImages }) => {
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
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>Progreso:</span>
            <span className="font-bold text-slate-800">
              {currentIndex >= 0 ? currentIndex + 1 : 0} / 39
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Historial:
          </h4>
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

      <div className="lg:col-span-2 bg-slate-950 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between min-h-[520px] border border-slate-800 relative">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5">
          <Terminal className="w-80 h-80 text-blue-500" />
        </div>
        <div className="flex justify-between items-center z-10">
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5 uppercase">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>{' '}
            React View
          </span>
          <span className="text-slate-400 text-xs">
            Carta #{currentIndex >= 0 ? currentIndex + 1 : '--'}
          </span>
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
            className="px-5 py-2 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Revelar Concepto
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL QUE UNE TODO ---
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userImages, setUserImages] = useState({});
  const [bitacora, setBitacora] = useState({
    imagenes: false,
    baraja: false,
    planillas: false,
  });

  const navItems = [
    { id: 'dashboard', label: 'Panel', icon: LayoutDashboard },
    { id: 'uploader', label: 'Ilustraciones', icon: ImagePlus },
    { id: 'baraja', label: 'Imprimir Baraja', icon: Layers },
    { id: 'planillas', label: 'Imprimir Planillas', icon: Grid },
    { id: 'juego', label: 'Modo Gritón', icon: Play, special: true },
  ];

  return (
    <div className="min-h-screen">
      <header className="no-print bg-slate-900 text-white shadow-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold loteria-font">
                Lotería del Dev
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                Arquitectura Consolidada
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition ${
                  activeTab === item.id
                    ? item.special
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <DashboardPanel bitacora={bitacora} setBitacora={setBitacora} />
        )}
        {activeTab === 'uploader' && (
          <ImageManager userImages={userImages} setUserImages={setUserImages} />
        )}
        {activeTab === 'baraja' && <DeckPrinter userImages={userImages} />}
        {activeTab === 'planillas' && <BoardPrinter userImages={userImages} />}
        {activeTab === 'juego' && <GameMode userImages={userImages} />}
      </main>
    </div>
  );
}
