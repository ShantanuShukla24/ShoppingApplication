package com.example.Shopping.controller;

import com.example.Shopping.service.ChatbotService;
import jakarta.persistence.SecondaryTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/help")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/chatbot")
    public ResponseEntity<String> getChatBotResponse(@RequestBody String message){
        message=message.toLowerCase();
        return ResponseEntity.ok().body(chatbotService.generateResponse(message));
    }
}
