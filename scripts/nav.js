// Injects the shared site nav into #nav-placeholder on every page.
// To add a new page: add one <li> entry to the `links` array below.
(function () {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  // Detect depth so paths resolve correctly from any subfolder.
  const inPages = window.location.pathname.includes('/pages/');
  const base = inPages ? '../' : '';

  const links = [
    { href: 'index.html',                 label: 'Home' },
    { href: 'pages/history-refactor.html', label: 'History' },
    { href: 'pages/theatre.html',          label: 'Theater Bill' },
    { href: 'pages/theatre-2.html',        label: 'Village Theatre' },
    { href: 'pages/stew-recipe.html',      label: 'Stew Recipe' },
    { href: 'pages/cascade.html',          label: 'Cascade Mountains' },
    { href: 'pages/opt-images.html',       label: 'Optimized Images' },
    { href: 'pages/fluid.html',            label: 'Fluid Dimensions' },
    { href: 'pages/media-queries.html',    label: 'Media Queries' },
    { href: 'pages/orcas.html',            label: 'Orcas Island' },
    { href: '#',                           label: 'Contact' },
  ];

  const items = links
    .map(function (l) {
      // Strip "pages/" prefix when building href from inside /pages/
      const href = inPages ? base + l.href.replace(/^pages\//, '') : base + l.href;
      return '<li><a href="' + href + '">' + l.label + '</a></li>';
    })
    .join('\n        ');

  placeholder.outerHTML =
    '<nav class="kiwi"><ul>\n        ' + items + '\n      </ul></nav>';
})();
