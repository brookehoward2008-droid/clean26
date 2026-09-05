(function () {
  const inPages = window.location.pathname.includes('/pages/');

  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = 'anonymous';
  document.head.appendChild(preconnect2);

  const fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,0..100;1,9..144,300..900,0..100&display=swap';
  document.head.appendChild(fonts);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = inPages ? '../styles/nav.css' : 'styles/nav.css';
  document.head.appendChild(link);

  const navPath = inPages ? 'nav.html' : 'pages/nav.html';

  fetch(navPath)
    .then(response => response.text())
    .then(data => {
      const navPlaceholder = document.getElementById('nav-placeholder');

      if (!navPlaceholder) {
        return;
      }

      navPlaceholder.innerHTML = data;

      // Resolve the shared fragment from both the root page and /pages/.
      if (!inPages) {
        navPlaceholder.querySelectorAll('a[href]').forEach(anchor => {
          const href = anchor.getAttribute('href');
          if (!href || href.startsWith('#') || /^https?:\/\//i.test(href)) return;
          anchor.setAttribute('href', href === '../index.html' ? 'index.html' : `pages/${href}`);
        });
      }

      const toggleButton = document.getElementsByClassName('toggle-button')[0];
      const navbarLinks = document.getElementsByClassName('i-am-not-amish')[0];

      if (toggleButton && navbarLinks) {
        toggleButton.setAttribute('aria-expanded', 'false');

        toggleButton.addEventListener('click', event => {
          event.preventDefault();
          navbarLinks.classList.toggle('active');
          toggleButton.classList.toggle('active');
          toggleButton.setAttribute('aria-expanded', navbarLinks.classList.contains('active'));
        });
      }
    });
})();

