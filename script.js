const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
playPauseBtn = container.querySelector(".play-pause i");

playPauseBtn.addEventListener("click", () => {
    mainVideo.paused ? mainVideo.play(): mainVideo.pause();
});