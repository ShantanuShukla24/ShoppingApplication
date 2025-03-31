package com.example.Shopping.service;

import com.example.Shopping.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Shopping.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        Optional<User> userdata = userRepository.findByEmail(user.getEmail());
        if (userdata.isPresent()){
            userdata.get().setName(user.getName());
            userdata.get().setEmail(user.getEmail());
            userdata.get().setAddress(user.getAddress());
            userdata.get().setRole(user.getRole());
            userRepository.save(userdata.get());
            return userdata.get();
        }else
            return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


}

