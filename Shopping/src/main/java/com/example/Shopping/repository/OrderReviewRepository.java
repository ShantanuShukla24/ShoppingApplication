package com.example.Shopping.repository;

import com.example.Shopping.model.OrderReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderReviewRepository extends JpaRepository<OrderReview,Long> {
}
