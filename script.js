document.addEventListener("DOMContentLoaded", () => {
  const miniGames = [
    { id: 'roue', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a72711c0-0775-11f0-8d5b-0242ac110002-png-regular_image.png', rules: 'Faites tourner la roue et laissez le hasard décider !' },
    { id: 'mot-interdit', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4efdacc-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Définis un mot interdit. Celui qui le dit boit !' },
    { id: 'dos-a-dos', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a2e4f190-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Deux joueurs dos à dos. Même réponse : les autres boivent. Sinon, eux !' },
    { id: 'synonymes', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a6dc9f14-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Trouve un synonyme. Tu sèches ? Tu bois !' },
    { id: 'retour', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a624022e-0775-11f0-bc18-0242ac110002-png-regular_image.png', rules: 'Retourne à la case départ. Donne 2 gorgées.' },
    { id: 'cul-sec', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a13b5a64-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Finis ton verre. Sinon, bois 2 gorgées.' },
    { id: 'valise', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4008472-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Jeu de mémoire. Celui qui se trompe boit.' },
    { id: 'qui-pourrait', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a62ea620-0775-11f0-8daf-0242ac110002-png-regular_image.png', rules: '“Qui pourrait... ?” Le plus visé boit 2 gorgées.' },
    { id: 'de-gorgees', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a2fdf58c-0775-11f0-8b1d-0242ac110002-png-regular_image.png', rules: 'Lance un dé. Tu tombes sur ton chiffre ? Tu donnes. Sinon, tu bois !' },
    { id: 'mime', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4ca4d20-0775-11f0-aa6f-0242ac110002-png-regular_image.png', rules: 'Mime un mot. Personne ne trouve ? Bois 5 gorgées.' },
    { id: 'roi', image: 'https://cdn.b12.io/client_media/TvcPcmAO/75121696-077d-11f0-b822-0242ac110002-png-regular_image.png', rules: 'Le Roi des mensonges : devine la bonne anecdote !' },
    { id: 'main', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a5a9f8b2-0775-11f0-b4b9-0242ac110002-png-regular_image.png', rules: 'Une main imposée. Chaque oubli = 1 gorgée.' }
  ];

  const miniGamesList = document.getElementById('mini-games');
  const boardCells = document.querySelectorAll('.board-cell');
  const trashZone = document.getElementById('trash-zone');
  const saveBtn = document.getElementById('save-board');

  // Ajouter les mini-jeux à gauche
  miniGames.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.className = 'mini-game';
    gameElement.style.backgroundImage = `url(${game.image})`;
    gameElement.dataset.rules = game.rules;
    gameElement.setAttribute('draggable', true);

    gameElement.addEventListener('click', () => {
      gameElement.classList.add('clicked');
    });

    gameElement.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', JSON.stringify(game));
      const ghost = gameElement.cloneNode(true);
      ghost.style.position = "absolute";
      ghost.style.top = "-999px";
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, 40, 40);
      setTimeout(() => ghost.remove(), 0);
    });

    miniGamesList.appendChild(gameElement);
  });

  // Drag & drop sur le plateau
  boardCells.forEach(cell => {
    cell.addEventListener('dragover', e => e.preventDefault());

    cell.addEventListener('drop', e => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      if (dragging && dragging.parentElement.classList.contains('board-cell')) {
        if (cell.firstChild) cell.removeChild(cell.firstChild);
        cell.appendChild(dragging);
        return;
      }

      const data = e.dataTransfer.getData('text/plain');
      if (data) {
        const game = JSON.parse(data);
        const clone = document.createElement('div');
        clone.className = 'mini-game';
        clone.style.backgroundImage = `url(${game.image})`;
        clone.setAttribute('draggable', true);

        clone.addEventListener('dragstart', e => {
          e.dataTransfer.setData('custom-game', '');
          clone.classList.add('dragging');
          trashZone.classList.add('visible');
          const ghost = clone.cloneNode(true);
          ghost.style.position = "absolute";
          ghost.style.top = "-999px";
          document.body.appendChild(ghost);
          e.dataTransfer.setDragImage(ghost, 40, 40);
          setTimeout(() => ghost.remove(), 0);
        });

        clone.addEventListener('dragend', () => {
          trashZone.classList.remove('visible');
          clone.classList.remove('dragging');
        });

        if (cell.firstChild) cell.removeChild(cell.firstChild);
        cell.appendChild(clone);
      }
    });
  });

  // Corbeille
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

  // Sauvegarde
  saveBtn.addEventListener('click', () => {
    const boardState = [];

    boardCells.forEach((cell, index) => {
      const game = cell.querySelector('.mini-game');
      if (game) {
        const bg = game.style.backgroundImage;
        const gameData = miniGames.find(g => bg.includes(g.image));
        if (gameData) {
          boardState.push({ index, id: gameData.id });
        }
      }
    });

    localStorage.setItem('friendSipBoard', JSON.stringify(boardState));
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✅ Sauvegardé !';
    saveBtn.disabled = true;
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }, 2000);
  });

  // Rechargement à l’ouverture
  const savedState = localStorage.getItem('friendSipBoard');
  if (savedState) {
    const parsed = JSON.parse(savedState);

    parsed.forEach(slot => {
      const cell = boardCells[slot.index];
      const gameData = miniGames.find(g => g.id === slot.id);
      if (cell && gameData) {
        const clone = document.createElement('div');
        clone.className = 'mini-game';
        clone.style.backgroundImage = `url(${gameData.image})`;
        clone.setAttribute('draggable', true);

        clone.addEventListener('dragstart', e => {
          e.dataTransfer.setData('custom-game', '');
          clone.classList.add('dragging');
          trashZone.classList.add('visible');
          const ghost = clone.cloneNode(true);
          ghost.style.position = "absolute";
          ghost.style.top = "-999px";
          document.body.appendChild(ghost);
          e.dataTransfer.setDragImage(ghost, 40, 40);
          setTimeout(() => ghost.remove(), 0);
        });

        clone.addEventListener('dragend', () => {
          trashZone.classList.remove('visible');
          clone.classList.remove('dragging');
        });

        if (cell.firstChild) cell.removeChild(cell.firstChild);
        cell.appendChild(clone);
      }
    });
  }

  // Popup fermeture
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
