package com.example.ProducerConsumer.controller;

import io.prometheus.client.Counter;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class ConsumerController {

    private final Counter kafkaEventsCounter;
    private int totalEventsProcessed = 0;

    public ConsumerController() {
        // Create custom Prometheus counter with labels
        kafkaEventsCounter = Counter.build()
                .name("kafka_events_received_total")
                .help("Total number of Kafka events received")
                .labelNames("event_type")
                .register();
        
        System.out.println("✅ Consumer Controller initialized");
    }

    /**
     * Kafka listener - consumes messages from 'testy' topic
     */
    @KafkaListener(topics = "testy", groupId = "metrics-consumer-group")
    public void listen(String eventData) {
        totalEventsProcessed++;
        
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        
        System.out.println("\n" + "─".repeat(50));
        System.out.println("📩 [" + timestamp + "] Event Received from Kafka");
        System.out.println("─".repeat(50));
        System.out.println("Event Type: " + eventData);
        System.out.println("Total Events Processed: " + totalEventsProcessed);
        
        // Increment Prometheus counter with event type label
        kafkaEventsCounter.labels(eventData).inc();
        
        // Process the event
        processEvent(eventData);
        
        System.out.println("─".repeat(50) + "\n");
    }
    
    /**
     * Business logic to process different event types
     */
    private void processEvent(String eventData) {
        switch (eventData) {
            case "userClick":
                System.out.println("🛒 Processing: User clicked 'Buy a Course'");
                System.out.println("   ➜ Saving to database...");
                System.out.println("   ➜ Sending confirmation email...");
                System.out.println("   ➜ Updating analytics dashboard...");
                System.out.println("   ➜ Triggering recommendation engine...");
                break;
                
            case "courseView":
                System.out.println("👀 Processing: User viewed course");
                System.out.println("   ➜ Recording view in analytics...");
                System.out.println("   ➜ Updating trending courses...");
                break;
                
            case "addToCart":
                System.out.println("🛍️ Processing: Course added to cart");
                System.out.println("   ➜ Saving cart state...");
                System.out.println("   ➜ Sending reminder email in 24h...");
                break;
                
            case "checkout":
                System.out.println("💳 Processing: User initiated checkout");
                System.out.println("   ➜ Creating payment session...");
                System.out.println("   ➜ Reserving course seat...");
                break;
                
            case "enrollment":
                System.out.println("🎓 Processing: User enrolled in course");
                System.out.println("   ➜ Granting course access...");
                System.out.println("   ➜ Sending welcome email...");
                break;
                
            default:
                System.out.println("❓ Unknown event type: " + eventData);
                System.out.println("   ➜ Logging for analysis...");
        }
    }
    
    /**
     * Get total events processed
     */
    public int getTotalEventsProcessed() {
        return totalEventsProcessed;
    }
}