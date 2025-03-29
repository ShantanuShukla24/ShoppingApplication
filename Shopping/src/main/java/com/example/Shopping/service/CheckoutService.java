package com.example.Shopping.service;

import com.example.Shopping.model.Checkout;
import com.example.Shopping.model.Product;
import com.example.Shopping.model.User;

import java.util.ArrayList;

public interface CheckoutService {

    public Checkout getCheckoutDetails(ArrayList<Product> products);

}