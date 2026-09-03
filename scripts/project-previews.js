// Assign a video source only when its card is on screen. Posters remain usable
// without JavaScript, with reduced motion, and when autoplay is unavailable.
const previews = [...document.querySelectorAll('video.project-media[data-src]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const saveData = navigator.connection?.saveData;
const visiblePreviews = new Set();

function updatePreview(video) {
  if (!visiblePreviews.has(video) || document.hidden || reducedMotion.matches || saveData) {
    video.pause();
    return;
  }
  if (!video.getAttribute('src')) video.src = video.dataset.src;
  video.play().catch(() => { /* Keep the still poster if playback is blocked. */ });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visiblePreviews.add(entry.target);
      else visiblePreviews.delete(entry.target);
      updatePreview(entry.target);
    }
  }, { threshold: 0.1 });
  previews.forEach(video => observer.observe(video));
}

document.addEventListener('visibilitychange', () => previews.forEach(updatePreview));
reducedMotion.addEventListener('change', () => previews.forEach(updatePreview));
