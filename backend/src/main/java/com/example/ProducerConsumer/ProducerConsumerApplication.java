package com.example.ProducerConsumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
public class ProducerConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProducerConsumerApplication.class, args);
        
        System.out.println("\n" + "=".repeat(60));
        System.out.println("🚀 Kafka Application Started Successfully!");
        System.out.println("=".repeat(60));
        System.out.println("📊 Backend API:        http://localhost:8080");
        System.out.println("❤️  Health Check:      http://localhost:8080/actuator/health");
        System.out.println("📈 Prometheus Metrics: http://localhost:8080/actuator/prometheus");
        System.out.println("🎛️  Kafka UI:          http://localhost:8090");
        System.out.println("📊 Prometheus:         http://localhost:9090");
        System.out.println("📈 Grafana:            http://localhost:3001 (admin/admin)");
        System.out.println("=".repeat(60) + "\n");
    }
}