package comp3011.assignment1.service;

import org.springframework.ai.audio.transcription.TranscriptionModel;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TranscriptionService {

  private final TranscriptionModel transcriptionModel;

  public TranscriptionService(TranscriptionModel transcriptionModel) {
    this.transcriptionModel = transcriptionModel;
  }

  // the transcriptionModel class already have the transcribe method
  public String transcribe(MultipartFile audio) {

    return transcriptionModel.transcribe(audio.getResource());
  }

}
