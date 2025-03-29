package com.example.Shopping.service;

import com.example.Shopping.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAllProducts();
    Optional<Product> getProductById(Long id);
    Product updateProduct(Product product);
    Optional<Product> getProductByName(String name);
    String addProduct(Product product);

}
