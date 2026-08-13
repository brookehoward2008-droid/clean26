const video = document.getElementById("wallpaper-video");
const soundToggle = document.querySelector(".sound-toggle");
const shoreAudio = document.getElementById("shore-audio");

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

if (soundToggle && shoreAudio) {
  shoreAudio.volume = 0.42;

  const setSoundState = (active) => {
    soundToggle.setAttribute("aria-pressed", String(active));
    const label = soundToggle.querySelector(".sound-label");
    if (label) {
      label.textContent = active ? "shore playing" : "real pebble shore";
    }
  };

  const removeUnlockListeners = () => {
    window.removeEventListener("pointerdown", unlockAutoplay);
    window.removeEventListener("touchstart", unlockAutoplay);
    window.removeEventListener("mousedown", unlockAutoplay);
    window.removeEventListener("keydown", unlockAutoplay);
    window.removeEventListener("wheel", unlockAutoplay);
  };

  const playShore = async () => {
    try {
      await shoreAudio.play();
      setSoundState(true);
      removeUnlockListeners();
      return true;
    } catch {
      setSoundState(false);
      return false;
    }
  };

  function unlockAutoplay(event) {
    if (event.target.closest && event.target.closest(".sound-toggle")) return;
    if (!shoreAudio.paused) return;
    playShore();
  }

  soundToggle.addEventListener("click", async () => {
    if (!shoreAudio.paused) {
      shoreAudio.pause();
      setSoundState(false);
      return;
    }

    await playShore();
  });

  shoreAudio.addEventListener("ended", () => setSoundState(false));
  shoreAudio.addEventListener("pause", () => setSoundState(false));

  playShore().then((started) => {
    if (!started) {
      const unlockOptions = { passive: true };
      window.addEventListener("pointerdown", unlockAutoplay, unlockOptions);
      window.addEventListener("touchstart", unlockAutoplay, unlockOptions);
      window.addEventListener("mousedown", unlockAutoplay, unlockOptions);
      window.addEventListener("keydown", unlockAutoplay);
      window.addEventListener("wheel", unlockAutoplay, unlockOptions);
    }
  });
}
