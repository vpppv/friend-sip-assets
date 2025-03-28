document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('customisation-container');
  const savedBoard = JSON.parse(localStorage.getItem('boardConfig') || '[]');

  // Si aucune donnée dans le board
  if (!savedBoard.length) {
    container.innerHTML = '<p style="text-align:center;color:#888;">Aucun mini-jeu à personnaliser. Retournez au plateau pour commencer.</p>';
    return;
  }

  // Pour chaque mini-jeu du board
  savedBoard.forEach((item, index) => {
    const line = document.createElement('div');
    line.className = 'custom-line';

    // 🖼️ Image de prévisualisation de la case
    const preview = document.createElement('div');
    preview.className = 'mini-preview';
    preview.style.backgroundImage = item.id;
    line.appendChild(preview);

    // 📁 Zone d’upload de l’image
    const upload = document.createElement('label');
    upload.className = 'image-upload';
    upload.textContent = 'Importer / dropper une photo';

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    const uploadedImg = document.createElement('img');
    uploadedImg.style.display = 'none';

    const fileName = document.createElement('div');
    fileName.className = 'file-name';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.style.display = 'none';

    // 🔄 Fonction pour réinitialiser l’image
    const resetUpload = () => {
      uploadedImg.src = '';
      uploadedImg.style.display = 'none';
      fileName.textContent = '';
      deleteBtn.style.display = 'none';
      upload.innerHTML = '';
      upload.textContent = 'Importer / dropper une photo';
      upload.appendChild(input);
      upload.appendChild(uploadedImg);
      upload.appendChild(fileName);
      upload.appendChild(deleteBtn);
    };

    // 📸 Lecture et affichage de l’image uploadée
    const handleFile = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        uploadedImg.src = reader.result;
        uploadedImg.style.display = 'block';
        fileName.textContent = file.name;
        deleteBtn.style.display = 'inline-block';
        upload.textContent = '';
        upload.appendChild(input);
        upload.appendChild(uploadedImg);
        upload.appendChild(fileName);
        upload.appendChild(deleteBtn);
      };
      reader.readAsDataURL(file);
    };

    // 📂 Upload classique
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleFile(file);
    });

    // 🖱️ Gestion du drag & drop
    upload.addEventListener('dragover', (e) => {
      e.preventDefault();
      upload.classList.add('dragging');
    });

    upload.addEventListener('dragleave', () => {
      upload.classList.remove('dragging');
    });

    upload.addEventListener('drop', (e) => {
      e.preventDefault();
      upload.classList.remove('dragging');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFile(file);
      }
    });

    // 🗑️ Bouton de suppression de l’image
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetUpload();
    });

    // Ajout des éléments à la zone d’upload
    upload.appendChild(input);
    upload.appendChild(uploadedImg);
    upload.appendChild(fileName);
    upload.appendChild(deleteBtn);
    line.appendChild(upload);

    // 📝 Zone de texte
    const textZone = document.createElement('div');
    textZone.className = 'text-input';

    const textarea = document.createElement('textarea');
    textarea.maxLength = 50;

    const count = document.createElement('div');
    count.className = 'char-count';
    count.textContent = '0/25';

    // 💬 Placeholder personnalisé pour le champ de texte
    const placeholder = document.createElement('div');
    placeholder.className = 'custom-placeholder';
    placeholder.textContent = 'Personnalise le titre du mini-jeu';
    placeholder.style.display = textarea.value.length > 0 ? 'none' : 'block';

    // 🎯 Gestion du texte saisi
    textarea.addEventListener('input', () => {
      const length = textarea.value.length;
      count.textContent = `${length}/25`;
      count.classList.toggle('over-limit', length > 25);
      placeholder.style.display = length > 0 ? 'none' : 'block';
    });

    // Ajout des éléments dans la zone texte
    textZone.appendChild(textarea);
    textZone.appendChild(placeholder);
    textZone.appendChild(count);
    line.appendChild(textZone);

    // Ajout de la ligne complète au container
    container.appendChild(line);
  });

  // 💾 Bouton Enregistrer
  document.getElementById('save-button').addEventListener('click', () => {
    const lines = document.querySelectorAll('.custom-line');
    const results = [];

    lines.forEach((line) => {
      const image = line.querySelector('img')?.src || null;
      const text = line.querySelector('textarea')?.value || '';
      results.push({ image, text });
    });

    localStorage.setItem('customCases', JSON.stringify(results));
    alert('✅ Données enregistrées !');
  });

  // ⬅️ Bouton Retour
  document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
