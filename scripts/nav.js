// Injects the shared site nav into #nav-placeholder on every page.
// To add a new page: add one <li> entry to the `links` array below.
(function () {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  // Detect depth so paths resolve correctly from any subfolder.
  const inPages = window.location.pathname.includes('/pages/');

  const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'pages/history-refactor.html', label: 'History' },
    { href: 'pages/theater.html', label: 'Theater Bill' },
    { href: 'pages/theatre-2.html', label: 'Village Theatre' },
    { href: 'pages/stew-recipe.html', label: 'Stew Recipe' },
    { href: 'pages/cascade.html', label: 'Cascade Mountains' },
    { href: 'pages/mobile-cascade.html', label: 'Cascade: Mobile Responsive' },
    { href: 'pages/olympic.html', label: 'Olympic Mountains' },
    { href: 'pages/opt-images.html', label: 'Optimized Images' },
    { href: 'pages/fluid.html', label: 'Fluid Dimensions' },
    { href: 'pages/media-queries.html', label: 'Media Queries' },
    { href: 'pages/orcas.html', label: 'Orcas Island' },
{ href: 'pages/lopez.html', label: 'Lopez Island' },
    { href: 'pages/grid-based-layout.html', label: 'Grid Layout' },
  ];

  const items = links
    .map(function (l) {
      let href;
      if (inPages) {
        // Sibling pages drop the "pages/" prefix; root files get "../"
        href = l.href.startsWith('pages/') ? l.href.slice(6) : '../' + l.href;
      } else {
        href = l.href;
      }
      return '<li><a href="' + href + '">' + l.label + '</a></li>';
    })
    .join('\n        ');

  placeholder.outerHTML =
    '<nav class="kiwi"><ul>\n        ' + items + '\n      </ul></nav>';
})();
