document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-default');
  
    button.addEventListener('click', function () {
        menu.classList.toggle('hidden');
    });
});