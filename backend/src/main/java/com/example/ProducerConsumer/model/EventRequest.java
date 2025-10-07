package com.example.ProducerConsumer.model;

public class EventRequest {
    private String event;

    // Default constructor
    public EventRequest() {
    }

    // Constructor with parameter
    public EventRequest(String event) {
        this.event = event;
    }

    // Getter
    public String getEvent() {
        return event;
    }

    // Setter
    public void setEvent(String event) {
        this.event = event;
    }

    // toString for debugging
    @Override
    public String toString() {
        return "EventRequest{" +
                "event='" + event + '\'' +
                '}';
    }
}