package com.example.Shopping.service;

import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.util.CoreMap;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SentimentService {

    private final StanfordCoreNLP pipeline;

    public SentimentService() {
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize,ssplit,pos,parse,sentiment");
        this.pipeline = new StanfordCoreNLP(props);
    }

    public String analyzeSentiment(String text) {
        Annotation annotation = pipeline.process(text);
        int mainSentiment = 0;
        int longest = 0;

        for (CoreMap sentence : annotation.get(CoreAnnotations.SentencesAnnotation.class)) {
            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
            int sentenceLength = sentence.toString().length();
            if (sentenceLength > longest) {
                mainSentiment = sentimentToScore(sentiment);
                longest = sentenceLength;
            }
        }

        return scoreToSentiment(mainSentiment);
    }

    private int sentimentToScore(String sentiment) {
        return switch (sentiment.toLowerCase()) {
            case "very negative" -> 0;
            case "negative" -> 1;
            case "neutral" -> 2;
            case "positive" -> 3;
            case "very positive" -> 4;
            default -> 2;
        };
    }

    private String scoreToSentiment(int score) {
        return switch (score) {
            case 0 -> "Very Negative";
            case 1 -> "Negative";
            case 2 -> "Neutral";
            case 3 -> "Positive";
            case 4 -> "Very Positive";
            default -> "Unknown";
        };
    }
}
