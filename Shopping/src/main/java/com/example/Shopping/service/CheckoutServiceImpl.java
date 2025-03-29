package com.example.Shopping.service;

import com.example.Shopping.model.Checkout;
import com.example.Shopping.model.Product;
import com.example.Shopping.model.User;
import jakarta.servlet.http.HttpSession;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    @Override
    public Checkout getCheckoutDetails(ArrayList<Product> products) {
        double total=0;
        Checkout checkout = new Checkout();
        checkout.setProducts(products);
        for (Product product: products) {
            product.getDescription();
            total=total+product.getPrice();
        }
        checkout.setTotal(total);
        return checkout;
    }
}
