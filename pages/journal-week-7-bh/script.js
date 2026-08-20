const video = document.getElementById("background-video");
const ambientAudio = document.getElementById("ambient-audio");
const soundToggle = document.querySelector(".sound-toggle");

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

if (ambientAudio && soundToggle) {
  ambientAudio.volume = 0.36;

  const setSoundState = (active) => {
    soundToggle.setAttribute("aria-pressed", String(active));
    const label = soundToggle.querySelector(".sound-label");
    if (label) {
      label.textContent = active ? "Sound on" : "Sound";
    }
  };

  const removeUnlockListeners = () => {
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("mousedown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };

  const playAmbient = async () => {
    try {
      await ambientAudio.play();
      setSoundState(true);
      removeUnlockListeners();
      return true;
    } catch {
      setSoundState(false);
      return false;
    }
  };

  function unlockAudio(event) {
    if (event.target.closest && event.target.closest(".sound-toggle")) return;
    if (!ambientAudio.paused) return;
    playAmbient();
  }

  soundToggle.addEventListener("click", async () => {
    if (!ambientAudio.paused) {
      ambientAudio.pause();
      setSoundState(false);
      return;
    }

    await playAmbient();
  });

  ambientAudio.addEventListener("pause", () => setSoundState(false));
  ambientAudio.addEventListener("playing", () => setSoundState(true));

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
