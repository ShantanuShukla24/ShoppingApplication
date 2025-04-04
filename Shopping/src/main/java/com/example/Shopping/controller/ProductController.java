package com.example.Shopping.controller;

import com.example.Shopping.model.Product;
import com.example.Shopping.model.Review;
import com.example.Shopping.repository.ReviewRepository;
import com.example.Shopping.service.ProductService;
import com.example.Shopping.service.SentimentService;
import com.example.Shopping.service.WordSentimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private WordSentimentService wordSentimentService;

    @Autowired
    private SentimentService sentimentService;

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.addProduct(product));
    }

    @PostMapping("/addProducts")
    public ResponseEntity<String> addProducts(@RequestBody List<Product> products) {
        for (Product product:products) {
            productService.addProduct(product);
        }
        return ResponseEntity.ok("Products added");
    }

    @GetMapping("/getProduct/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id){
        Optional<Product> product = productService.getProductById(id);
        if(product.isPresent())
            return ResponseEntity.ok().body(product.get());
        else
            return ResponseEntity.badRequest().body("product not found");
    }

    @PostMapping("/review/{id}")
    public ResponseEntity<?> addReview(@PathVariable Long id, @RequestBody String text){
        Optional<Product> product = productService.getProductById(id);
        Review review = new Review();
        if(product.isPresent()){
            review.setContent(text);
            review.setProduct(product.get());
            review.setSentiment(sentimentService.analyzeSentiment(review.getContent()));
            reviewRepository.save(review);
            return ResponseEntity.ok().body(product.get());

        }else{
            return ResponseEntity.badRequest().body("product not found");
        }
    }
    @GetMapping("review/{productId}")
    public ResponseEntity<?> getSentiments(@PathVariable Long productId){
            List<Review> reviews = reviewRepository.findByProductId(productId);
            if(!reviews.isEmpty()){
                String allReviews="";
                for (Review review: reviews) {
                    allReviews=allReviews+" "+review.getContent();
                }
                String sentiment = sentimentService.analyzeSentiment(allReviews);
                return ResponseEntity.ok().body(sentiment);
            }else
                return ResponseEntity.status(204).body("no reviews found for this product");

    }
}

