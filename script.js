const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input"),
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
videoTimeline = container.querySelector(".video-timeline"),
progressBar = container.querySelector(".progress-bar"),
skipforward = container.querySelector(".skip-forward i"),
skipbackward = container.querySelector(".skip-backward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options");
let timer;

const hiddenControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(()=>{
        container.classList.remove("show-controls");
    },3000);
}
hiddenControls();

container.addEventListener("mousemove",()=>{
    container.classList.add("show-controls");
    clearTimeout(timer);
    hiddenControls();
});

const formatTime = time =>{
    // getting sec,min,hrs
    let seconds = Math.floor(time % 60),
    minutes = Math.floor (time / 60) % 60,
    hours = Math.floor(time / 3600);

    // adding 0 at the begining if particular value less than 10
    seconds = seconds < 10 ? `${seconds}`: seconds;
    minutes = minutes < 10 ? `${minutes}`: minutes;
    hours = hours < 10 ? `${hours}`: hours;

    if(hours == 0){
        return `${minutes}:${seconds}`;   
    }else{
        return `${hours}:${minutes}:${seconds}`;
    }

}

mainVideo.addEventListener("timeupdate",e => {
    let{currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

videoTimeline.addEventListener("click",e =>{
    let timelineWidth = e.target.clientWidth;
    mainVideo.currentTime = (e.offsetX/ timelineWidth)* mainVideo.duration;
});

mainVideo.addEventListener("loadeddata",e =>{
    videoDuration.innerText = formatTime(e.target.duration);
});

const dragableProgressBar = e => {
    let timelineWidth = e.target.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth)* mainVideo.duration;
}

videoTimeline.addEventListener("mousemove", e =>{
    const progressTime = videoTimeline.querySelector("span");
    let offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    let timelineWidth = videoTimeline.clientWidth;
    let percent = (e.offsetX / timelineWidth)* mainVideo.duration;
    progressTime.innerText = formatTime(percent);
    
});

videoTimeline.addEventListener("mousedown",()=>{
    videoDuration.addEventListener("mousemove",dragableProgressBar);
});

container.addEventListener("mouseup",()=>{
    videoDuration.removeEventListener("mousemove",dragableProgressBar);
});
 
volumeBtn.addEventListener("click",()=>{
    if(volumeBtn.classList.contains("fa-volume-high")){
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark");
    }else{
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-xmark","fa-volume-high");
    }
// update volume slider according to video volume
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input",e =>{
    // passing slider value as video volume
    mainVideo.volume = e.target.value;
    if(e.target.value == 0){
        volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark");
    }else{
        volumeBtn.classList.replace("fa-volume-xmark","fa-volume-high");
    }
});

speedBtn.addEventListener("click",()=>{
    speedOptions.classList.toggle("show");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click",()=>{
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click",e=>{
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded"){
    speedOptions.classList.remove("show");
    }
});

skipforward.addEventListener("click",()=>{
    // add 5 seconds to the current video time
    mainVideo.currentTime +=5;
});

skipbackward.addEventListener("click",()=>{
    // subtract 5 seconds from current video time
    mainVideo.currentTime -=5;
});

playPauseBtn.addEventListener("click", () => {
    // if video is paused, play the video else pause the video
    mainVideo.paused ? mainVideo.play(): mainVideo.pause();
});

mainVideo.addEventListener("play",() => {
    playPauseBtn.classList.replace("fa-play","fa-pause");
    console.log("play");
});

mainVideo.addEventListener("pause",() => {
    playPauseBtn.classList.replace("fa-pause", "fa-play");
    console.log("paus")
});

