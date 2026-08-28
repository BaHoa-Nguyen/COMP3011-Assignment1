package comp3011.assignment1.service;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.context.ConfigurableApplicationContext;

import comp3011.assignment1.dto.UptimeResponse;

import java.time.Instant;

@Service
public class AdminService {

  private final ConfigurableApplicationContext context;

  private Instant utcServerStart;

  private final double MILLI_TO_SECOND = 1000.0;

  public AdminService(ConfigurableApplicationContext context) {
    this.context = context;
  }

  // retrieve the utcServerStart right after the Spring boot application starts
  @EventListener(ApplicationReadyEvent.class)
  public void onApplicationReady() {
    utcServerStart = Instant.now();
  }

  public UptimeResponse getServerUptime() {
    Instant utcNow = Instant.now();

    double serverUptimeSeconds = (utcNow.toEpochMilli() - utcServerStart.toEpochMilli()) / MILLI_TO_SECOND;

    return new UptimeResponse(utcServerStart, utcNow, serverUptimeSeconds);

  }

  public void shutdownServer() {
    // create a new thread to shutdown the server
    new Thread(() -> context.close()).start();
  }
}
