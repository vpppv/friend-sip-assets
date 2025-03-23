document.addEventListener("DOMContentLoaded", () => {
  // Mini popup "Bienvenue" + "Comment ça fonctionne"
  const popups = [
    {
      title: "Bienvenue",
      message: "Construis ton jeu d'alcool personnalisé pour un cadeau inoubliable !"
    },
    {
      title: "Comment ça fonctionne",
      message: "Choisis les mini jeux à gauche, et glisse-les sur le plateau à droite."
    }
  ];

  let currentPopup = 0;
  showPopup();

  function showPopup() {
    const popup = document.createElement("div");
    popup.className = "popup-overlay";
    popup.innerHTML = `
      <div class="popup">
        <h2>${popups[currentPopup].title}</h2>
        <p>${popups[currentPopup].message}</p>
        <button id="nextPopup">Suivant</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.getElementById("nextPopup").onclick = () => {
      popup.remove();
      currentPopup++;
      if (currentPopup < popups.length) showPopup();
    };
  }

  // Drag & Drop des mini-jeux
  const draggables = document.querySelectorAll(".mini-game");
  const dropzones = document.querySelectorAll(".plateau-cell:not(.start)");

  draggables.forEach((el) => {
    el.setAttribute("draggable", true);
    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", el.id);
    });
    el.addEventListener("mouseenter", () => {
      const rule = el.dataset.rules;
      if (rule) {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.innerText = rule;
        el.appendChild(tooltip);
      }
    });
    el.addEventListener("mouseleave", () => {
      const tooltip = el.querySelector(".tooltip");
      if (tooltip) tooltip.remove();
    });
  });

  dropzones.forEach((cell) => {
    cell.addEventListener("dragover", (e) => e.preventDefault());
    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const dragged = document.getElementById(id);
      if (dragged) {
        const clone = dragged.cloneNode(true);
        clone.classList.add("placed");
        clone.removeAttribute("draggable");
        cell.innerHTML = "";
        cell.appendChild(clone);
      }
    });
  });
});
