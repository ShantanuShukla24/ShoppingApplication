package com.example.Shopping.service;

import org.springframework.stereotype.Service;

import java.util.Set;


@Service
public class ChatbotServiceImpl implements ChatbotService {

    @Override
    public String generateResponse(String message) {
        String lowerMsg = message.toLowerCase();

        if (lowerMsg.contains("hello") || lowerMsg.contains("hi")) {
            return "Hello! How can I help you today?";
        } else if (lowerMsg.contains("price")) {
            return "You can find the price of each product on its detail page.";
        } else if (lowerMsg.contains("return")) {
            return "Our return policy allows returns within 30 days of purchase.";
        } else if (lowerMsg.contains("track")) {
            return "Please provide your order ID to track the status.";
        } else {
            return "Sorry, I didn't quite understand that. Could you please rephrase?";
        }
    }
}