const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsStartRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    const {data: videoFile} = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
}

function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function(track) {
    track.stop();
    });
    videoElem.srcObject = null;
    }
const stopRecording = ()=> {
    console.log(videoRecorder.state);
    videoRecorder.stop();
    console.log(videoRecorder.state);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start Recording";
    stopStreamedVideo(videoPreview);
}

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    console.log(videoRecorder.state);
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
}

const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {width: 640, height: 320}
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop Recording";
        streamObject = stream;
        startRecording();
    } catch(error) {
        recordBtn.innerHTML = "Can't Record";
    } finally {
        recordBtn.removeEventListener("click", getVideo);      
    }
}


function init(){
    recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    init();
}

