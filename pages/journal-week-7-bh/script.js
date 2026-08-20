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

if (ambientAudio) {
  ambientAudio.volume = 0.36;

  const removeUnlockListeners = () => {
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("mousedown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };

  const playAmbient = async () => {
    try {
      await ambientAudio.play();
      removeUnlockListeners();
      return true;
    } catch {
      return false;
    }
  };

  function unlockAudio() {
    if (!ambientAudio.paused) return;
    playAmbient();
  }

  playAmbient().then((started) => {
    if (!started) {
      const unlockOptions = { passive: true };
      window.addEventListener("pointerdown", unlockAudio, unlockOptions);
      window.addEventListener("touchstart", unlockAudio, unlockOptions);
      window.addEventListener("mousedown", unlockAudio, unlockOptions);
      window.addEventListener("keydown", unlockAudio);
    }
  });
}
