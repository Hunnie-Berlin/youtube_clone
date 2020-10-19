const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreen = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");


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
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    fullScreen.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreen.removeEventListener("click", goFullScreen);
    fullScreen.addEventListener("click", exitFullScreen);
}

function exitFullScreen(){
    fullScreen.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreen.removeEventListener("click", exitFullScreen);
    fullScreen.addEventListener("click", goFullScreen);
    if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  
    if (hours < 10 && hours !== 0) {
      hours = `0${hours}:`;
    } else if(hours === 0) {
        hours = ``;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
  return `${hours}${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
  totalTime.innerHTML = totalTimeString;
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
}

function init(){
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreen.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
}

if (videoContainer) {
    init();
}