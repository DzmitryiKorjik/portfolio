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


// Sélectionne le formulaire avec la classe "contact-form" et ajoute un gestionnaire d'événement "submit"
document.querySelector('.contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

  const formData = new FormData(this); // Récupère les données saisies dans le formulaire

  // Envoie une requête POST à l'API '/api/sendEmail'
  fetch('/api/sendEmail', {
    method: 'POST', // Méthode HTTP utilisée pour envoyer les données
    headers: {
      'Content-Type': 'application/json', // Indique que les données envoyées sont au format JSON
    },
    body: JSON.stringify({
      name: formData.get('name'), // Récupère la valeur du champ "name" du formulaire
      email: formData.get('email'), // Récupère la valeur du champ "email" du formulaire
      message: formData.get('message'), // Récupère la valeur du champ "message" du formulaire
    }),
  })
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(data => {
      // Vérifie si le message a été envoyé avec succès
      if (data.message === 'Le message a été envoyé avec succès !') {
        alert('Votre message a été envoyé avec succès!'); // Affiche une alerte de succès
      } else {
        alert('Erreur lors de l\'envoi du message.'); // Affiche une alerte d'erreur
      }
    })
    .catch(error => {
      alert('Erreur lors de l\'envoi du message.'); // Affiche une alerte en cas d'erreur lors de la requête
    });
});

