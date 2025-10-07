package com.example.ProducerConsumer.controller;

import com.example.ProducerConsumer.model.EventRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/producer")
@CrossOrigin(origins = "http://localhost:3000")
public class ProducerController {
    
    private static final String TOPIC_NAME = "testy";
    
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    /**
     * Send event to Kafka
     */
    @PostMapping("/event")
    public ResponseEntity<Map<String, Object>> sendEventToKafka(@RequestBody EventRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String eventData = request.getEvent();
            
            // Validation
            if (eventData == null || eventData.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Event data cannot be empty");
                return ResponseEntity.badRequest().body(response);
            }
            
            System.out.println("📤 Sending event to Kafka: " + eventData);
            
            // Send to Kafka asynchronously
            CompletableFuture<SendResult<String, String>> future = 
                kafkaTemplate.send(TOPIC_NAME, "userEvent", eventData);
            
            // Handle success/failure
            future.whenComplete((result, ex) -> {
                if (ex != null) {
                    System.err.println("❌ Failed to send event: " + ex.getMessage());
                } else {
                    System.out.println("✅ Event sent successfully!");
                    System.out.println("   Topic: " + result.getRecordMetadata().topic());
                    System.out.println("   Partition: " + result.getRecordMetadata().partition());
                    System.out.println("   Offset: " + result.getRecordMetadata().offset());
                }
            });
            
            // Prepare response
            response.put("success", true);
            response.put("message", "Event sent successfully to Kafka");
            response.put("event", eventData);
            response.put("topic", TOPIC_NAME);
            response.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Exception occurred: " + e.getMessage());
            e.printStackTrace();
            
            response.put("success", false);
            response.put("message", "Failed to send event");
            response.put("error", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "Kafka Producer");
        health.put("kafka_broker", "localhost:9092");
        health.put("topic", TOPIC_NAME);
        health.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        
        return ResponseEntity.ok(health);
    }
    
    /**
     * Test endpoint
     */
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Producer Controller is working! ✅");
    }
}