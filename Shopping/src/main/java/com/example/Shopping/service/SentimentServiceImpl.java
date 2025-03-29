package com.example.Shopping.service;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

@Service
public class SentimentServiceImpl implements SentimentService{

    private Set<String> positiveWords = Set.of(
            "great", "excellent", "amazing", "fantastic", "awesome",
            "love", "wonderful", "superb", "brilliant", "outstanding", "good"
    );
    private Set<String> negativeWords = Set.of(
            "bad", "terrible", "worst", "awful", "horrible",
            "hate", "poor", "disappointing", "frustrating", "dreadful"
    );
    @Override
    public String analyzeSentiment(String text) {
        List<String> words = Collections.list(new StringTokenizer(text.toLowerCase(), " .,!?;:\"'()[]{}"))
                .stream()
                .map(token -> (String) token)
                .collect(Collectors.toList());
        long positiveCount = positiveWords.stream().filter(words::contains).count();
        long negativeCount = negativeWords.stream().filter(words::contains).count();

        if (positiveCount > negativeCount) return "Positive";
        else if (negativeCount > positiveCount) return "Negative";
        else return "Neutral";
    }
}
