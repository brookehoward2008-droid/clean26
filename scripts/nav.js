// Inject nav.css before loading the nav component
(function () {
  const inPages = window.location.pathname.includes('/pages/');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = inPages ? '../styles/nav.css' : 'styles/nav.css';
  document.head.appendChild(link);
})();

fetch('nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav-placeholder').innerHTML = data;

    // Wait until nav.html is loaded, THEN attach toggle behavior
    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navbarLinks = document.getElementsByClassName('kiwi')[0];

    if (toggleButton && navbarLinks) {
      toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        toggleButton.classList.toggle('active');
      });
    }
  });
