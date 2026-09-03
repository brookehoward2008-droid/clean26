const video = document.getElementById("background-video");
const ambientAudio = document.getElementById("ambient-audio");

document.body.classList.add("video-not-ready");

if (video) {
  const markReady = () => document.body.classList.remove("video-not-ready");
  const markBlocked = () => document.body.classList.add("video-not-ready");

  video.addEventListener("playing", markReady, { once: true });
  video.addEventListener("loadeddata", markReady, { once: true });
  video.addEventListener("error", markBlocked);

  const playAttempt = video.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(markBlocked);
  }
}

const soundToggle = document.querySelector('.sound-toggle');
if (ambientAudio && soundToggle) {
  ambientAudio.volume = 0.36;
  const syncSound = () => {
    soundToggle.setAttribute('aria-pressed', String(!ambientAudio.paused));
    soundToggle.textContent = ambientAudio.paused ? 'Play ambient sound' : 'Pause ambient sound';
  };
  ambientAudio.addEventListener('play', syncSound);
  ambientAudio.addEventListener('pause', syncSound);
  soundToggle.addEventListener('click', async () => {
    if (!ambientAudio.paused) { ambientAudio.pause(); return; }
    try { await ambientAudio.play(); }
    catch { soundToggle.textContent = 'Retry ambient sound'; }
  });
}
