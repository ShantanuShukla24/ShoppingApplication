package com.example.Shopping.service;

import com.example.Shopping.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User addUser(User user);
    void deleteUser(Long id);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
}
