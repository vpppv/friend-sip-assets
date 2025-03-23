document.addEventListener("DOMContentLoaded", () => {
  const miniGames = [
    { id: 'roue', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a72711c0-0775-11f0-8d5b-0242ac110002-png-regular_image.png', rules: 'Faites tourner la roue et laissez le hasard décider !' },
    { id: 'mot-interdit', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4efdacc-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Définis un mot interdit. Celui qui le dit boit !' },
    { id: 'dos-a-dos', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a2e4f190-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Deux joueurs dos à dos. Même réponse : les autres boivent. Sinon, eux !' },
    { id: 'synonymes', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a6dc9f14-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Trouve un synonyme. Tu sèches ? Tu bois !' },
    { id: 'retour', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a624022e-0775-11f0-bc18-0242ac110002-png-regular_image.png', rules: 'Retourne à la case départ. Donne 2 gorgées.' },
    { id: 'cul-sec', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a13b5a64-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Finis ton verre. Sinon, bois 2 gorgées.' },
    { id: 'valise', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4008472-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Jeu de mémoire. Celui qui se trompe boit.' },
    { id: 'qui-pourrait', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a62ea620-0775-11f0-8daf-0242ac110002-png-regular_image.png', rules: '“Qui pourrait... ?” Le plus visé boit 2 gorgées.' }
    // Tu peux ajouter plus de mini-jeux ici
  ];

  const miniGamesList = document.getElementById('mini-games');

  miniGames.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.className = 'mini-game';
    gameElement.id = game.id;
    gameElement.style.backgroundImage = `url(${game.image})`;
    gameElement.dataset.rules = game.rules;
    gameElement.draggable = true;
    miniGamesList.appendChild(gameElement);
  });

  // Drag & Drop
  const draggables = document.querySelectorAll('.mini-game');
  const cells = document.querySelectorAll('.board-cell');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  cells.forEach(cell => {
    cell.addEventListener('dragover', e => {
      e.preventDefault();
      const draggable = document.querySelector('.dragging');
      if (draggable && !cell.hasChildNodes() && cell.dataset.fixed !== 'true') {
        cell.appendChild(draggable);
      }
    });
  });

  // 💥 Popup : cette version force sa fermeture
  const closeButtons = document.querySelectorAll('[data-close-button]');
  const popup = document.querySelector('.popup');
  const overlay = document.getElementById('overlay');

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (popup) popup.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    });
  });

  overlay.addEventListener('click', () => {
    if (popup) popup.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
  });
});
