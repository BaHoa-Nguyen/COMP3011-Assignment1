package comp3011.assignment1.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import comp3011.assignment1.service.TranscriptionService;

@RestController
@RequestMapping("/api/v1")
public class TranscriptionController {

  private final TranscriptionService transcriptionService;

  public TranscriptionController(TranscriptionService transcriptionService) {
    this.transcriptionService = transcriptionService;
  }

  @PostMapping("/transcribe")
  // using ResponseEntity to handle HTTP response
  public ResponseEntity<String> receiveAudio(@RequestParam("audio") MultipartFile audioFile) {
    try {

      String transcription = transcriptionService.transcribe((audioFile));
      return new ResponseEntity<>(transcription, HttpStatus.OK);

    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
