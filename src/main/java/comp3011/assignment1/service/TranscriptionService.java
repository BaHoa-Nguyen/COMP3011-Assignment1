package comp3011.assignment1.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.audio.transcription.TranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// for logging purposes
@Slf4j
@Service
public class TranscriptionService {

  private final TranscriptionModel transcriptionModel;

  public TranscriptionService(TranscriptionModel transcriptionModel) {
    this.transcriptionModel = transcriptionModel;
  }

  // the transcriptionModel class already have the transcribe method
  public String transcribe(MultipartFile audioFile) {

    try {
      // using gpt-4o-transcribe for more accurate transcription
      OpenAiAudioTranscriptionOptions options = OpenAiAudioTranscriptionOptions.builder()
          .model("gpt-4o-transcribe")
          .language("en") // default english
          .temperature(0.0f) // temperature set at 0 for better accuracy
          .build();

      return transcriptionModel.transcribe(audioFile.getResource(), options);

    } catch (Exception err) {
      log.error("Transcription Failed: ", err);
      throw err;
    }
  }

}
