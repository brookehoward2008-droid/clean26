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

  const playShore = async () => {
    try {
      await shoreAudio.play();
      setSoundState(true);
      return true;
    } catch {
      setSoundState(false);
      return false;
    }
  };

  const unlockAutoplay = async () => {
    if (!shoreAudio.paused) return;
    const started = await playShore();
    if (started) {
      window.removeEventListener("pointerdown", unlockAutoplay);
      window.removeEventListener("keydown", unlockAutoplay);
    }
  };

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
      window.addEventListener("pointerdown", unlockAutoplay, { once: true });
      window.addEventListener("keydown", unlockAutoplay, { once: true });
    }
  });
}
