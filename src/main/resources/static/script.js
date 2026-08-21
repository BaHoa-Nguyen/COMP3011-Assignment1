const recordBtn = document.querySelector(".record-btn");
const recordingStatus = document.querySelector(".status");
const transcription = document.querySelector(".transcription");


let isRecording = false; // for changing status
let mediaRecorder;
let mediaStream;
let audioChunks = [];

// change recording status when the button is clicked
recordBtn.addEventListener("click", async () => {

  if (!isRecording) {
    await startRecording();

  } else {
    stopRecording();
  }
})

const startRecording = async () => {

  try {

    audioChunks = []; // always empty when starting recording

    // request microphone permission
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })

    mediaRecorder = new MediaRecorder(mediaStream);

    // storing the recording pieces
    mediaRecorder.ondataavailable = handleStoringChunks;

    mediaRecorder.onstop = handleStopRecording;

    mediaRecorder.start();

    updateRecordingUI(isRecording = true);

  } catch {

    isRecording = false;
    recordingStatus.textContent = "Microphone access denied!";
  }

}

const stopRecording = () => {

  // avoid stopping a recording session that isn't currently active
  if (mediaRecorder && mediaRecorder.state === "inactive") {
    return
  }

  mediaRecorder.stop();
  mediaStream.getTracks().forEach(track => track.stop()); // stop the microphone usage after the recording is stopped

  updateRecordingUI(isRecording = false);
}

const handleStoringChunks = (event) => {

  if (event.data.size > 0) {
    audioChunks.push(event.data)
  }

}

const handleStopRecording = async () => {

  const audioBlob = new Blob(audioChunks, { type: "audio/webm" })

  await uploadAudio(audioBlob);
}

const uploadAudio = async (audioBlob) => {

  const formData = new FormData();

  formData.append("audio", audioBlob, "recording.webm");

  recordingStatus.textContent = "Processing…";
  transcription.textContent = "Hold tight! We're processing your beautiful voice…";

  try {
    const response = await fetch("/api/v1/transcribe", {
      method: "POST",
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Server error. Status: ${response.status}`);
    }

    transcription.textContent = await response.text();
    recordingStatus.textContent = "Done, ready for another record!";

  } catch {

    transcription.textContent = "Transcription failed. Please try again!";
    recordingStatus.textContent = "Error";

  }
}

const updateRecordingUI = (isRecording) => {

  if (isRecording) {

    recordBtn.textContent = "Stop Recording";
    recordingStatus.textContent = "Recording...";
    recordingStatus.classList.add("recording"); // add flickering effect

  } else {

    recordBtn.textContent = "Start Recording";
    recordingStatus.textContent = "Not recording";
    recordingStatus.classList.remove("recording"); // remove flickering effect
  }
}

