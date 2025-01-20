document.addEventListener("DOMContentLoaded", function () {
  // Gestion du menu : toggle de la classe "hidden" pour afficher/masquer le menu
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      const menu = document.querySelector("#nav .menu");
      if (menu) {
        menu.classList.toggle("hidden");
      }
    });
  }

  // Gestion des cartes
  const cards = document.querySelectorAll('.card-wrap');

  cards.forEach(cardWrap => {
    const cardBg = cardWrap.querySelector('.card-bg');
    const dataImage = cardWrap.getAttribute('data-image');
    
    // On vérifie si l'image est définie et on applique l'image de fond
    if (dataImage) {
      cardBg.style.backgroundImage = `url(${dataImage})`;
    }

    // Fonction pour le mouvement de la souris (pour les appareils de bureau avec souris)
    const onMouseMove = (e) => {
      const card = cardWrap.querySelector('.card');
      const rect = cardWrap.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      const rotateX = (mouseY / rect.height) * -15;
      const rotateY = (mouseX / rect.width) * 15;

      card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    // Fonction pour réinitialiser la rotation lorsque la souris quitte la carte
    const onMouseLeave = () => {
      const card = cardWrap.querySelector('.card');
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    // Application des événements en fonction du type d'appareil
    if (window.matchMedia("(pointer: fine)").matches) {  // Vérification si l'appareil utilise une souris (desktop)
      cardWrap.addEventListener('mousemove', onMouseMove);
      cardWrap.addEventListener('mouseleave', onMouseLeave);
    } else {  // Pour les appareils tactiles (mobile)
      cardWrap.addEventListener('touchmove', (e) => {
        const card = cardWrap.querySelector('.card');
        const rect = cardWrap.getBoundingClientRect();
        const touch = e.touches[0];  // On récupère le premier point de contact
        const mouseX = touch.clientX - rect.left - rect.width / 2;
        const mouseY = touch.clientY - rect.top - rect.height / 2;

        const rotateX = (mouseY / rect.height) * -15;
        const rotateY = (mouseX / rect.width) * 15;

        card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      });

      cardWrap.addEventListener('touchend', () => {
        const card = cardWrap.querySelector('.card');
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      });
    }
  });
});
