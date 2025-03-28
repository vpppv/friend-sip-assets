document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('customisation-container');
  const savedBoard = JSON.parse(localStorage.getItem('boardConfig') || '[]');

  if (!savedBoard.length) {
    container.innerHTML = '<p style="text-align:center;color:#888;">Aucun mini-jeu à personnaliser. Retournez au plateau pour commencer.</p>';
    return;
  }

  savedBoard.forEach((item, index) => {
    const line = document.createElement('div');
    line.className = 'custom-line';

    // Bloc image du mini-jeu
    const preview = document.createElement('div');
    preview.className = 'mini-preview';
    preview.style.backgroundImage = item.id;
    line.appendChild(preview);

    // Zone d’upload / drag & drop
    const upload = document.createElement('label');
    upload.className = 'image-upload';
    upload.textContent = 'Importer / dropper une photo';
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    const uploadedImg = document.createElement('img');
    upload.appendChild(input);
    upload.appendChild(uploadedImg);
    line.appendChild(upload);

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        uploadedImg.src = reader.result;
        uploadedImg.style.display = 'block';
        upload.textContent = '';
        upload.appendChild(input);
        upload.appendChild(uploadedImg);
      };
      reader.readAsDataURL(file);
    });

    // Zone de texte
    const textZone = document.createElement('div');
    textZone.className = 'text-input';
    const textarea = document.createElement('textarea');
    textarea.maxLength = 50;
    const count = document.createElement('div');
    count.className = 'char-count';
    count.textContent = '0/25';
    textZone.appendChild(textarea);
    textZone.appendChild(count);
    line.appendChild(textZone);

    textarea.addEventListener('input', () => {
      const length = textarea.value.length;
      count.textContent = `${length}/25`;
      count.classList.toggle('over-limit', length > 25);
    });

    container.appendChild(line);
  });

  // Enregistrement
  document.getElementById('save-button').addEventListener('click', () => {
    const lines = document.querySelectorAll('.custom-line');
    const results = [];

    lines.forEach((line, index) => {
      const image = line.querySelector('img')?.src || null;
      const text = line.querySelector('textarea')?.value || '';
      results.push({ image, text });
    });

    localStorage.setItem('customCases', JSON.stringify(results));
    alert('✅ Données enregistrées !');
  });

  // Retour
  document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
