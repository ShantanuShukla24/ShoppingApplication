package com.example.Shopping.repository;

import com.example.Shopping.model.User;
import com.example.Shopping.model.UserFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserFeedbackRepository extends JpaRepository<UserFeedback, Long> {

    Optional<User> findUserById(Long id);
}
