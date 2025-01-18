document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.querySelector("#nav .menu");
    menu.classList.toggle("hidden");
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-wrap');

    cards.forEach(cardWrap => {
      const cardBg = cardWrap.querySelector('.card-bg');
      const dataImage = cardWrap.getAttribute('data-image');
      cardBg.style.backgroundImage = `url(${dataImage})`;

      cardWrap.addEventListener('mousemove', (e) => {
        const card = cardWrap.querySelector('.card');
        const rect = cardWrap.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        const rotateX = (mouseY / rect.height) * -15;
        const rotateY = (mouseX / rect.width) * 15;

        card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      });

      cardWrap.addEventListener('mouseleave', () => {
        const card = cardWrap.querySelector('.card');
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      });
    });
  });