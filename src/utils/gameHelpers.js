// Archivo: src/utils/gameHelpers.js

// Mezclador Fisher-Yates estándar
export const shuffleDeck = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };
  
  // Algoritmo para generar 'N' planillas únicas de 16 cartas (4x4)
  export const generateUniqueBoards = (count, baseDeck) => {
    const boards = [];
    const seenLayouts = new Set();
  
    while (boards.length < count) {
      // 1. Barajamos todo el mazo disponible
      const shuffled = shuffleDeck(baseDeck);
      // 2. Tomamos las primeras 16 cartas (garantiza que no hay duplicados dentro de la planilla)
      const selection = shuffled.slice(0, 16);
      
      // 3. Creamos una huella digital única ordenando los IDs para comprobar similitud exacta
      const layoutFingerprint = selection.map(c => c.id).sort().join(',');
  
      // 4. Si esta combinación exacta de 16 cartas no se ha creado antes, la aceptamos
      if (!seenLayouts.has(layoutFingerprint)) {
        seenLayouts.add(layoutFingerprint);
        boards.push(selection);
      }
    }
    return boards;
  };