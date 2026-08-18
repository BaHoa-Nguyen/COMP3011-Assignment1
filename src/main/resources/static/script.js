const recordBtn = document.querySelector(".record-btn");
const recordingStatus = document.querySelector(".status");

let isRecording = false; // for changing status

// change recording status when the button is clicked
recordBtn.addEventListener("click", () => {
	isRecording = !isRecording;
	
	if(isRecording) {
		recordBtn.textContent = "Stop Recording";
		recordingStatus.textContent = "Recording...";
		recordingStatus.classList.add("recording"); // add flickering effect
		
	} else {
		recordBtn.textContent = "Start Recording";
		recordingStatus.textContent = "Not recording";
		recordingStatus.classList.remove("recording"); // remove flickering effect
	}
})
