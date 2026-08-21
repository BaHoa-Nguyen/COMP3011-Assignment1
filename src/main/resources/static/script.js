const recordBtn = document.querySelector(".record-btn");
const recordingStatus = document.querySelector(".status");

let isRecording = false; // for changing status
let mediaRecorder;
let mediaStream;
let audioChunks = [];

// change recording status when the button is clicked
recordBtn.addEventListener("click", async () => {

	if(!isRecording) {
		await startRecording();

	} else {
		stopRecording();
	}
})


const startRecording = async () => {

	try {

		audioChunks = []; // always empty when starting recording

		// request microphone permission
		 mediaStream = await navigator.mediaDevices.getUserMedia({
			audio: true
		})

		mediaRecorder = new MediaRecorder(mediaStream);

		// storing the recording pieces
		mediaRecorder.ondataavailable = (event) => {

			// not storing empty packet
			if(event.data.size > 0) {
				audioChunks.push(event.data);

			}

		}

		mediaRecorder.onstop = () => {

			const audioBlob = new Blob(audioChunks, {
				type: "audio/webm"
			})

			// later replace with API call
			console.log(`Audio size: ${Math.round(audioBlob.size / 1024)}KB`);
			console.log(`Audio type: ${audioBlob.type}`);
		}

		mediaRecorder.start();

		isRecording = true;

		recordBtn.textContent = "Stop Recording";
		recordingStatus.textContent = "Recording...";

		recordingStatus.classList.add("recording"); // add flickering effect

	} catch (err) {
		console.error(`Error: ${err}`);

		isRecording = false;

		recordingStatus.textContent = "Microphone access denied!";
	}

}

const stopRecording = () => {

	// avoid stopping a recording session that isn't currently active
	if(mediaRecorder && mediaRecorder.state === "inactive")  {
		return
	}

	mediaRecorder.stop();
	mediaStream.getTracks().forEach(track => track.stop()); // stop the microphone usage after the recording is stopped

	isRecording = false;

	recordBtn.textContent = "Start Recording";
	recordingStatus.textContent = "Not recording";
	recordingStatus.classList.remove("recording"); // remove flickering effect

}