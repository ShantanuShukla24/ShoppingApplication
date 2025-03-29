package com.example.Shopping.controller;

import com.example.Shopping.model.Checkout;
import com.example.Shopping.model.OrderReview;
import com.example.Shopping.model.Product;
import com.example.Shopping.model.User;
import com.example.Shopping.repository.CheckoutRepository;
import com.example.Shopping.repository.OrderReviewRepository;
import com.example.Shopping.service.CheckoutService;
import com.example.Shopping.service.SentimentService;
import com.example.Shopping.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/checkout")
public class checkoutController {

    @Autowired
    private UserService userService;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private CheckoutService checkoutService;

    @Autowired
    private OrderReviewRepository orderReviewRepository;

    @Autowired
    private SentimentService sentimentService;

    @PostMapping("/checkoutDetails")
    public ResponseEntity<Checkout> getCheckoutDetails(@RequestBody ArrayList<Product> productList, HttpSession session){
        Checkout response = checkoutService.getCheckoutDetails(productList);
        String email = (String) session.getAttribute("email");
        User user=userService.getUserByEmail(email).get();
        response.setAddress(user.getAddress());
        checkoutRepository.save(response);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/orderReview/{id}")
    public ResponseEntity<?> addReview(@PathVariable Long id,@RequestBody String text){
        OrderReview orderReview = new OrderReview();
        orderReview.setOrderId(id);
        orderReview.setCheckout(checkoutRepository.findById(id).get());
        orderReview.setReview(text);
        orderReview.setSentiment(sentimentService.analyzeSentiment(text));
        orderReviewRepository.save(orderReview);
        return ResponseEntity.ok().body("Review sent succesfully");
    }

    @GetMapping("/orderReview/{orderId}")
    public ResponseEntity<?> getOrderSentiment(@PathVariable(name = "orderId") Long orderId){
        Optional<OrderReview> orderReview= orderReviewRepository.findById(orderId);
        if(orderReview.isPresent()){
            return ResponseEntity.ok().body(orderReview.get().getSentiment());
        }else
            return ResponseEntity.badRequest().body("no order found");
    }

}
