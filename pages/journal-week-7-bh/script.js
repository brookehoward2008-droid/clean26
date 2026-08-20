const video = document.getElementById("background-video");

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
