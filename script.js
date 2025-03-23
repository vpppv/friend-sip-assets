document.addEventListener("DOMContentLoaded", () => {
  const miniGames = [
    { id: 'roue', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a72711c0-0775-11f0-8d5b-0242ac110002-png-regular_image.png', rules: 'Faites tourner la roue et laissez le hasard décider !' },
    { id: 'cul-sec', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a13b5a64-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Finis ton verre. Sinon, bois 2 gorgées.' }
    // Ajoute plus de jeux ici !
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

  // 👇 FERMETURE POPUP ULTRA SIMPLE
  const closeBtn = document.getElementById("close-popup");
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");

  if (closeBtn && overlay && popup) {
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      popup.style.display = "none";
    });
  }
});
