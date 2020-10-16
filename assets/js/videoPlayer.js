const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreen = document.getElementById("jsFullScreen");


function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>'
    }
}

function handleVolumeClick() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function goFullScreen() {
    videoContainer.requestFullscreen();
    fullScreen.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreen.removeEventListener("click", goFullScreen);
    fullScreen.addEventListener("click", exitFullScreen);
}

function exitFullScreen(){
    fullScreen.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreen.removeEventListener("click", exitFullScreen);
    fullScreen.addEventListener("click", goFullScreen);
    document.exitFullscreen(); 
}

function init(){
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreen.addEventListener("click", goFullScreen);
}

if (videoContainer) {
    init();
}