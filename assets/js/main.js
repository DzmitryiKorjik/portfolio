document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('menu-toggle').addEventListener('click', function () {
        const menu = document.querySelector('#nav .menu');
        menu.classList.toggle('hidden');
    });
});