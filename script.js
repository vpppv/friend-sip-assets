/* === BASE === */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background: transparent;
}

.container {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 40px;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
}

/* === MINI-JEUX À GAUCHE === */
#mini-games {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.mini-game {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  cursor: grab;
  border: 2px solid #ccc;
  background-color: #fff;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.2s ease;
}

.mini-game:hover {
  transform: scale(1.05);
}

/* === INFOS DES RÈGLES === */
.mini-game:hover::after {
  content: attr(data-rules);
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffe990;
  color: #343131;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: normal;
  z-index: 10;
  width: 180px;
  text-align: center;
}

.mini-game:hover::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent #ffe990 transparent;
  z-index: 10;
}

/* Masquer l'infobulle après clic */
.mini-game.clicked::after,
.mini-game.clicked::before {
  display: none !important;
}

/* === PLATEAU DE JEU 5x5 === */
#board.square-board {
  display: grid;
  grid-template-columns: repeat(5, 80px);
  grid-template-rows: repeat(5, 80px);
  gap: 10px;
}

.board-cell {
  width: 80px;
  height: 80px;
  border: 2px dashed #aaa;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board-cell[data-fixed="true"] {
  background-color: #ffe26a;
  font-weight: bold;
  color: #000;
}

.empty-cell {
  width: 80px;
  height: 80px;
}

/* === POPUP D'ACCUEIL === */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.popup h2 {
  margin-top: 0;
  font-size: 24px;
}

.popup p {
  margin: 10px 0 20px;
  font-size: 16px;
}

.popup button {
  padding: 10px 20px;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  background: #5c5cff;
  color: white;
  cursor: pointer;
}

.popup button:hover {
  background: #4444ff;
}

/* === CORBEILLE === */
#trash-zone {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #ddd;
  color: #333;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 2000;
  transition: background-color 0.3s ease, transform 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

#trash-zone.visible {
  opacity: 1;
  pointer-events: auto;
}

#trash-zone.drag-over {
  background-color: #ff5c5c;
  color: white;
  transform: translateX(-50%) scale(1.05);
}

/* === RESPONSIVE MOBILE === */
@media (max-width: 600px) {
  .mini-game,
  .board-cell,
  .empty-cell {
    width: 60px;
    height: 60px;
  }

  #board.square-board {
    grid-template-columns: repeat(5, 60px);
    grid-template-rows: repeat(5, 60px);
    gap: 8px;
  }

  .mini-game:hover::after {
    font-size: 10px;
    width: 150px;
  }
}
