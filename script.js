// Attendre que le DOM soit entièrement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Liste des mini-jeux disponibles
 const miniGames = [
    { id: 'roue', name: 'Roue', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a72711c0-0775-11f0-8d5b-0242ac110002-png-regular_image.png', rules: 'Faites tourner la roue et laissez le hasard prendre le dessus : donnez, buvez ou ayez la chance de tomber sur la case Joker !' },
    { id: 'mot-interdit', name: 'Mot interdit', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4efdacc-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Une fois sur cette case, le joueur définit un mot interdit. Chaque nouveau mot interdit remplace le précédent. Celui qui se trompe boit 1 gorgée.' },
    { id: 'dos-a-dos', name: 'Dos à dos', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a2e4f190-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Deux joueurs dos à dos répondent aux questions de l’assemblée. Même réponse = l’assemblée boit. Sinon, eux boivent.' },
    { id: 'synonymes', name: 'Synonymes', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a6dc9f14-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Chacun donne un synonyme du mot choisi. Celui qui répète ou sèche boit 2 gorgées.' },
    { id: 'retour', name: 'Retour case départ', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a624022e-0775-11f0-bc18-0242ac110002-png-regular_image.png', rules: 'Retourne à la case départ et donne 2 gorgées à la personne de ton choix.' },
    { id: 'cul-sec', name: 'Cul sec', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a13b5a64-0775-11f0-a0cc-0242ac110002-png-regular_image.png', rules: 'Finis ton verre. S’il est vide, reprends-en un !' },
    { id: 'valise', name: 'Dans ma valise...', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4008472-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Jeu de mémoire. Celui qui se trompe boit 2 gorgées.' },
    { id: 'qui-pourrait', name: 'Qui pourrait ?', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a62ea620-0775-11f0-8daf-0242ac110002-png-regular_image.png', rules: '“Qui pourrait le plus... ?” Tout le monde pointe. Le plus visé boit 2 gorgées.' },
    { id: 'de-gorgees', name: 'Dé Gorgées', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a2fdf58c-0775-11f0-8b1d-0242ac110002-png-regular_image.png', rules: 'Annonce un chiffre et lance le dé. Si tu tombes dessus, tu donnes. Sinon, tu bois.' },
    { id: 'mime', name: 'Mime', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a4ca4d20-0775-11f0-aa6f-0242ac110002-png-regular_image.png', rules: 'Fais deviner ton mime. Si personne ne trouve, tu bois 5 gorgées.' },
    { id: 'pioche', name: 'Pioche', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a52958a6-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Pioche une carte dans la pile dédiée.' },
    { id: 'main', name: 'Plus qu’une main !', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a5a9f8b2-0775-11f0-b4b9-0242ac110002-png-regular_image.png', rules: 'Une main imposée. Chaque oubli = 1 gorgée.' },
    { id: 'marque', name: 'Marque', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a3f48f64-0775-11f0-b6c0-0242ac110002-png-regular_image.png', rules: 'Tour à tour, citez des marques. Plus d’idées ? 2 gorgées.' },
    { id: 'shot', name: 'Shot', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a6e867a4-0775-11f0-8e80-0242ac110002-png-regular_image.png', rules: 'Bois un shot ou partage-le avec un volontaire.' },
    { id: 'prison', name: 'Prison', image: 'https://cdn.b12.io/client_media/TvcPcmAO/745de54a-077d-11f0-996d-0242ac110002-png-regular_image.png', rules: 'Pour sortir : boire un shot ou faire un 6.' },
    { id: 'cap', name: 'Cap ou pas Cap ?', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a15eeab0-0775-11f0-bc18-0242ac110002-png-regular_image.png', rules: 'Relève le défi ou bois 3 gorgées.' },
    { id: 'alphabet', name: 'Alphabet', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a159582a-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Tour à tour, une lettre, un mot de la catégorie. Tu bloques ? 2 gorgées.' },
    { id: 'tournee', name: 'Tournée générale', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a766a5c4-0775-11f0-8f3b-0242ac110002-png-regular_image.png', rules: 'Tout le monde trinque. 2 gorgées pour chacun !' },
    { id: 'jamais', name: 'Je n’ai jamais...', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a34f9504-0775-11f0-b4b9-0242ac110002-png-regular_image.png', rules: 'Selon la phrase, ceux concernés boivent 2 gorgées.' },
    { id: 'partenaire', name: 'Partenaire de picole', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a591989e-0775-11f0-8b1d-0242ac110002-png-regular_image.png', rules: 'Choisis ton binôme : si l’un boit, l’autre aussi !' },
    { id: 'regle', name: 'Invente une règle', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a3821b8c-0775-11f0-aac7-0242ac110002-png-regular_image.png', rules: 'Crée une règle active pour un tour.' },
    { id: 'verite', name: 'Action ou Vérité ?', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a14b88b2-0775-11f0-9ee2-0242ac110002-png-regular_image.png', rules: 'Action ? Vérité ? Sinon… 5 gorgées !' },
    { id: 'roi', name: 'Le Roi des mensonges', image: 'https://cdn.b12.io/client_media/TvcPcmAO/75121696-077d-11f0-b822-0242ac110002-png-regular_image.png', rules: '2 anecdotes : la fausse ? Tu gagnes. Sinon… gorgées !' },
    { id: 'comptez', name: 'Comptez jusqu’à 15', image: 'https://cdn.b12.io/client_media/TvcPcmAO/a3a6cd7e-0775-11f0-8e80-0242ac110002-png-regular_image.png', rules: 'Comptez à plusieurs. Si doublon → tout le monde boit !' }
  ];

  // Sélectionner l'élément qui contiendra la liste des mini-jeux
  const miniGamesList = document.getElementById('mini-games');

  // Parcourir chaque mini-jeu et créer son élément HTML
  miniGames.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.className = 'mini-game';
    gameElement.id = game.id;
    gameElement.style.backgroundImage = `url(${game.image})`;
    gameElement.dataset.rules = game.rules;
    gameElement.draggable = true;
    gameElement.innerHTML = `<p>${game.name}</p>`;
    miniGamesList.appendChild(gameElement);
  });

  // Sélectionner tous les éléments draggables (mini-jeux)
  const draggables = document.querySelectorAll('.mini-game');
  // Sélectionner toutes les cellules du plateau
  const cells = document.querySelectorAll('.board-cell');

  // Ajouter les événements de drag aux mini-jeux
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  // Ajouter les événements de drag aux cellules du plateau
  cells.forEach(cell => {
    cell.addEventListener('dragover', e => {
      e.preventDefault();
      const draggable = document.querySelector('.dragging');
      if (draggable && !cell.hasChildNodes() && cell.dataset.fixed !== 'true') {
        cell.appendChild(draggable);
      }
    });
  });

  // Gestion des popups
  const openPopupButtons = document.querySelectorAll('[data-popup-target]');
  const closePopupButtons = document.querySelectorAll('[data-close-button]');
  const overlay = document.getElementById('overlay');

  openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = document.querySelector(button.dataset.popupTarget);
      openPopup(popup);
    });
  });

  closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
      closePopup(popup);
    });
  });

  overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active');
    popups.forEach(popup => {
      closePopup(popup);
    });
  });

  function openPopup(popup) {
    if (popup == null) return;
    popup.classList.add('active');
    overlay.classList.add('active');
  }

  function closePopup(popup) {
    if (popup == null) return;
    popup.classList.remove('active');
    overlay.classList.remove('active');
  }
});
