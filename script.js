document.addEventListener("DOMContentLoaded", () => {
  const miniGames = [
    { id: 'roue', name: 'Roue', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a72711c0-0775-11f0-8d5b-0242ac110002-png-regular_image.png', rules: 'Faites tourner la roue et laissez le hasard décider !' },
    { id: 'mot-interdit', name: 'Mot interdit', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4efdacc-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Définis un mot interdit. Celui qui le dit boit !' },
    { id: 'dos-a-dos', name: 'Dos à dos', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a2e4f190-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Deux joueurs dos à dos. Même réponse : les autres boivent. Sinon, eux !' },
    { id: 'synonymes', name: 'Synonymes', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a6dc9f14-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Trouve un synonyme. Tu sèches ? Tu bois !' },
    { id: 'retour', name: 'Retour case départ', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a624022e-0775-11f0-bc18-0242ac110002-png-regular_image.png', rules: 'Retourne à la case départ. Donne 2 gorgées.' },
    { id: 'cul-sec', name: 'Cul sec', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a13b5a64-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Finis ton verre. Sinon, bois 2 gorgées.' },
    { id: 'valise', name: 'Dans ma valise...', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4008472-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Jeu de mémoire. Celui qui se trompe boit.' },
    { id: 'qui-pourrait', name: 'Qui pourrait ?', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a62ea620-0775-11f0-8daf-0242ac110002-png-regular_image.png', rules: '“Qui pourrait... ?” Le plus visé boit 2 gorgées.' },
    { id: 'de-gorgees', name: 'Dé Gorgées', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a2fdf58c-0775-11f0-8b1d-0242ac110002-png-regular_image.png', rules: 'Lance un dé. Tu tombes sur ton chiffre ? Tu donnes. Sinon, tu bois !' },
    { id: 'mime', name: 'Mime', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4ca4d20-0775-11f0-aa6f-0242ac110002-png-regular_image.png', rules: 'Mime un mot. Personne ne trouve ? Bois 5 gorgées.' },
    { id: 'pioche', name: 'Pioche', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a52958a6-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Pioche une carte. Applique-la !' },
    { id: 'main', name: 'Plus qu’une main !', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a5a9f8b2-0775-11f0-b4b9-0242ac110002-png-regular_image.png', rules: 'Une main imposée. Chaque oubli = 1 gorgée.' },
    { id: 'marque', name: 'Marque', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a3f48f64-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Citez des marques à tour de rôle. Tu bloques ? Tu bois !' },
    { id: 'shot', name: 'Shot', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a6e867a4-0775-11f0-8e80-0242ac110002-png-regular_image.png', rules: 'Bois un shot ou choisis quelqu’un pour le faire.' },
    { id: 'prison', name: 'Prison', image: 'https://cdn.b12.io/client_media/TvcPcmAO/745de54a-077d-11f0-996d-0242ac110002-png-regular_image.png', rules: 'Pour sortir : shot ou un 6 au dé !' },
    { id: 'cap', name: 'Cap ou pas Cap ?', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a15eeab0-0775-11f0-bc18-0242ac110002-png-regular_image.png', rules: 'Relève le défi ou bois 3 gorgées.' },
    { id: 'alphabet', name: 'Alphabet', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a159582a-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Mot par lettre. Tu bloques ? 2 gorgées.' },
    { id: 'tournee', name: 'Tournée générale', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a766a5c4-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Tout le monde boit 2 gorgées !' },
    { id: 'jamais', name: 'Je n’ai jamais...', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a34f9504-0775-11f0-b4b9-0242ac110002-png-regular_image.png', rules: 'Ceux qui l’ont déjà fait boivent.' },
    { id: 'partenaire', name: 'Partenaire de picole', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a591989e-0775-11f0-8b1d-0242ac110002-png-regular_image.png', rules: 'Choisis ton binôme. Si tu bois, il boit aussi !' }
  ];

  const miniGamesList = document.getElementById('mini-games');

  // Injecter les mini-jeux sans texte
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

 // Popup : fermer quand on clique sur le bouton
document.querySelectorAll('[data-close-button]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('overlay').classList.remove('active');
    document.querySelector('.popup').classList.remove('active');
  });
});

// Fermer si on clique en dehors
const overlay = document.getElementById('overlay');
overlay.addEventListener('click', () => {
  const popup = document.querySelector('.popup');
  if (popup && popup.classList.contains('active')) {
    popup.classList.remove('active');
    overlay.classList.remove('active');
  }
});

