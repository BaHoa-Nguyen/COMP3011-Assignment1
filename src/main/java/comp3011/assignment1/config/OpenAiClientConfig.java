package comp3011.assignment1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;

@Configuration
public class OpenAiClientConfig {

  @Bean
  public OpenAIClient openAIClient() {
    return OpenAIOkHttpClient.fromEnv(); // get the api key from the env
  }

}
