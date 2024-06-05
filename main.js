document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  });
  videos.forEach((video) => {
    observer.observe(video);
  });
});

const btn = document.querySelector(".nav-btn");
const nav = document.querySelector("nav");

btn.addEventListener("click", () => {
  nav.classList.toggle("toggle");
});

const startRecordingButton = document.getElementById("startRecording");
const stopRecordingButton = document.getElementById("stopRecording");
const recordedAudio = document.getElementById("recordedAudio");

let mediaRecorder;
let chunks = [];

startRecordingButton.addEventListener("click", () => {
  startRecordingButton.disabled = true;
  stopRecordingButton.disabled = false;

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function (e) {
        const blob = new Blob(chunks, { type: "audio/wav" });
        chunks = [];
        const audioURL = URL.createObjectURL(blob);
        recordedAudio.src = audioURL;
      };

      mediaRecorder.start();
    })
    .catch((err) => console.error("Error:", err));
});

stopRecordingButton.addEventListener("click", () => {
  startRecordingButton.disabled = false;
  stopRecordingButton.disabled = true;

  mediaRecorder.stop();
});
