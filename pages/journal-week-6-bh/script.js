const video = document.getElementById("wallpaper-video");
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

if (soundToggle) {
  let audioContext;
  let masterGain;
  let timerId;
  let isPlaying = false;

  const setSoundState = (active) => {
    isPlaying = active;
    soundToggle.setAttribute("aria-pressed", String(active));
    const label = soundToggle.querySelector(".sound-label");
    if (label) {
      label.textContent = active ? "shore playing" : "pebbled shore";
    }
  };

  const makeNoiseBuffer = (seconds) => {
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, seconds * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }

    return buffer;
  };

  const addWave = () => {
    if (!isPlaying || !audioContext || !masterGain) return;

    const now = audioContext.currentTime;
    const wave = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();

    wave.buffer = makeNoiseBuffer(4);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(260, now);
    filter.frequency.exponentialRampToValueAtTime(820, now + 1.5);
    filter.frequency.exponentialRampToValueAtTime(210, now + 3.8);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 1.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.9);

    wave.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    wave.start(now);
    wave.stop(now + 4);
  };

  const addPebbles = () => {
    if (!isPlaying || !audioContext || !masterGain) return;

    const now = audioContext.currentTime;
    const count = 5 + Math.floor(Math.random() * 6);

    for (let i = 0; i < count; i += 1) {
      const tap = audioContext.createBufferSource();
      const filter = audioContext.createBiquadFilter();
      const gain = audioContext.createGain();
      const start = now + Math.random() * 1.15;

      tap.buffer = makeNoiseBuffer(1);
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(650 + Math.random() * 1700, start);
      filter.Q.setValueAtTime(4 + Math.random() * 8, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.04 + Math.random() * 0.035, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18 + Math.random() * 0.18);

      tap.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      tap.start(start);
      tap.stop(start + 0.5);
    }
  };

  const beginSound = async () => {
    if (!window.AudioContext && !window.webkitAudioContext) return;

    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume();

    masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.22, audioContext.currentTime);
    masterGain.connect(audioContext.destination);

    setSoundState(true);
    addWave();
    addPebbles();
    timerId = window.setInterval(() => {
      addWave();
      addPebbles();
    }, 3200);
  };

  const endSound = () => {
    window.clearInterval(timerId);
    timerId = undefined;

    if (masterGain && audioContext) {
      const endingGain = masterGain;
      masterGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      window.setTimeout(() => {
        endingGain.disconnect();
        if (masterGain === endingGain) {
          masterGain = undefined;
        }
      }, 450);
    }

    setSoundState(false);
  };

  soundToggle.addEventListener("click", () => {
    if (isPlaying) {
      endSound();
      return;
    }

    beginSound().catch(() => setSoundState(false));
  });
}
