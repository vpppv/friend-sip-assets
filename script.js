document.addEventListener("DOMContentLoaded", () => {
  const miniGames = [/* même contenu que tu avais ici avec les jeux */];

  const miniGamesList = document.getElementById('mini-games');
  const trashZone = document.getElementById('trash-zone');

  // === Création des mini-jeux dans la liste de gauche ===
  miniGames.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.className = 'mini-game';
    gameElement.style.backgroundImage = `url(${game.image})`;
    gameElement.dataset.rules = game.rules;
    gameElement.setAttribute('draggable', true);

    // ✅ Drag depuis la liste d’origine
    gameElement.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', JSON.stringify(game));
      e.dataTransfer.effectAllowed = 'copy';

      // ✅ Corrige le bug d'image déplacée trop grande
      const dragIcon = gameElement.cloneNode(true);
      dragIcon.style.position = "absolute";
      dragIcon.style.top = "-999px";
      dragIcon.style.left = "-999px";
      document.body.appendChild(dragIcon);
      e.dataTransfer.setDragImage(dragIcon, 40, 40);
      setTimeout(() => dragIcon.remove(), 0);
    });

    miniGamesList.appendChild(gameElement);
 // ✅ Clique pour masquer la règle
gameElement.addEventListener('click', () => {
  gameElement.classList.add('clicked');
});


  const boardCells = document.querySelectorAll('.board-cell');

  // === Zone de jeu : chaque case devient une drop zone
  boardCells.forEach(cell => {
    cell.addEventListener('dragover', e => {
      e.preventDefault();
    });

    cell.addEventListener('drop', e => {
      e.preventDefault();

      // On vérifie s’il y a un jeu en cours de déplacement
      const dragging = document.querySelector('.dragging');
      if (dragging && dragging.parentElement.classList.contains('board-cell')) {
        // ✅ On le déplace simplement dans la nouvelle case
        if (cell.firstChild) {
          cell.removeChild(cell.firstChild);
        }
        cell.appendChild(dragging);
        return;
      }

      // Sinon, c’est un nouveau jeu venant de la gauche
      const data = e.dataTransfer.getData('text/plain');
      if (data) {
        const game = JSON.parse(data);
        const clone = document.createElement('div');
        clone.className = 'mini-game';
        clone.style.backgroundImage = `url(${game.image})`;
        clone.setAttribute('draggable', true);
        // ⚠️ Pas de data-rules ici → pas d'affichage de la règle

        // ✅ Redrag possible
        clone.addEventListener('dragstart', e => {
          e.dataTransfer.setData('custom-game', '');
          clone.classList.add('dragging');
          trashZone.classList.add('visible');

          const dragIcon = clone.cloneNode(true);
          dragIcon.style.position = "absolute";
          dragIcon.style.top = "-999px";
          dragIcon.style.left = "-999px";
          document.body.appendChild(dragIcon);
          e.dataTransfer.setDragImage(dragIcon, 40, 40);
          setTimeout(() => dragIcon.remove(), 0);
        });

        clone.addEventListener('dragend', () => {
          trashZone.classList.remove('visible');
          clone.classList.remove('dragging');
        });

        // Si la case a déjà un jeu, on le remplace
        if (cell.firstChild) {
          cell.removeChild(cell.firstChild);
        }

        cell.appendChild(clone);
      }
    });
  });

  // === Corbeille pour supprimer un jeu du plateau
  trashZone.addEventListener('dragover', e => {
    e.preventDefault();
    trashZone.classList.add('drag-over');
  });

  trashZone.addEventListener('dragleave', () => {
    trashZone.classList.remove('drag-over');
  });

  trashZone.addEventListener('drop', () => {
    const dragging = document.querySelector('.dragging');
    if (dragging && dragging.parentElement.classList.contains('board-cell')) {
      dragging.parentElement.removeChild(dragging);
    }
    trashZone.classList.remove('drag-over');
    trashZone.classList.remove('visible');
  });

  // === Popup d'accueil
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
