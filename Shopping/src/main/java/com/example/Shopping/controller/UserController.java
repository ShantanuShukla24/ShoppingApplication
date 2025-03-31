package com.example.Shopping.controller;

import com.example.Shopping.model.User;
import com.example.Shopping.model.UserFeedback;
import com.example.Shopping.repository.UserFeedbackRepository;
import com.example.Shopping.service.SentimentService;
import com.example.Shopping.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SentimentService sentimentService;

    @Autowired
    private UserFeedbackRepository userFeedbackRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam(required = true, name = "email") String email,
                                        @RequestParam(required = true, name = "password") String password,
                                        HttpSession session){
        Optional<User> user = userService.getUserByEmail(email);
        if(user.isPresent() && user.get().getPassword().equals(password)){
            session.setAttribute("userId",user.get().getId());
            session.setAttribute("email",user.get().getEmail());
            return ResponseEntity.ok().body(user.get().getRole() + " login successful");
        }else {
            return ResponseEntity.badRequest().body("login failed");
        }
    }

    @PostMapping("/adminLogin")
    public ResponseEntity<String> adminLogin(@RequestParam(required = true, name = "email") String email,
                                             @RequestParam(required = true, name = "password") String password,
                                             HttpSession session){
        Optional<User> user = userService.getUserByEmail(email);
        if(user.isPresent()
                && user.get().getPassword().equals(password)
                && user.get().getRole().equalsIgnoreCase("admin")){
            session.setAttribute("email",email);
            return ResponseEntity.ok().body("Admin Login Successful");
        }else
            return ResponseEntity.status(403).body("admin login not available for user");
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        //user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.addUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/registerAll")
    public ResponseEntity<?> registerAllUsers(@RequestBody List<User> userList){
        for (User user: userList) {
            userService.addUser(user);
        }
        return ResponseEntity.ok().body("Added");
    }

    @GetMapping("/findByEmail")
    public ResponseEntity<?> findUserByEmail(@RequestParam(name = "email") String email){
        Optional<User> user = userService.getUserByEmail(email);
        if(user.isPresent()){
            return ResponseEntity.ok().body(user.get());
        }else {
            return ResponseEntity.badRequest().body("user not found");
        }
    }

    @PostMapping("/feedbacks")
    public ResponseEntity<?> addFeedback(@RequestBody String text,HttpSession session) {
        Long userId= (Long) session.getAttribute("userId");
        Optional<User> user = userService.getUserById(userId);
        UserFeedback feedback = new UserFeedback();
        feedback.setFeedback(text);
        feedback.setUser(user.get());
        feedback.setSentiment(sentimentService.analyzeSentiment(feedback.getFeedback()));
        userFeedbackRepository.save(feedback);
        return ResponseEntity.ok("feedback added");
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.updateUser(user));
    }
}
