(function () {
  const pathname = window.location.pathname;
  const pagesMarker = '/pages/';
  const pagesIndex = pathname.indexOf(pagesMarker);
  const inPages = pagesIndex !== -1;
  const afterPages = inPages ? pathname.slice(pagesIndex + pagesMarker.length) : '';
  const pathSegments = afterPages.split('/').filter(Boolean);
  const directoryDepth = inPages ? (pathname.endsWith('/') ? pathSegments.length : Math.max(pathSegments.length - 1, 0)) : 0;
  const sitePrefix = inPages ? '../'.repeat(directoryDepth + 1) : '';
  const navPath = inPages ? `${'../'.repeat(directoryDepth)}nav.html` : 'pages/nav.html';

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
  fonts.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,0..100;1,9..144,300..900,0..100;display=swap';
  document.head.appendChild(fonts);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${sitePrefix}styles/nav.css`;
  document.head.appendChild(link);

  fetch(navPath)
    .then(response => { if (!response.ok) throw new Error(`Navigation returned ${response.status}`); return response.text(); })
    .then(data => {
      const navPlaceholder = document.getElementById('nav-placeholder');
      if (!navPlaceholder) return;
      navPlaceholder.innerHTML = data;
      navPlaceholder.querySelectorAll('a[href]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) return;
        anchor.setAttribute('href', href === '../index.html' ? `${sitePrefix}index.html` : `${sitePrefix}pages/${href}`);
      });
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
    })
    .catch(error => console.error('Navigation failed to load:', error));
})();

