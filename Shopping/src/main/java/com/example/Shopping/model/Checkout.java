package com.example.Shopping.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "checkout")
public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private String address;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "checkout_id")
    private List<Product> products;
    private boolean isUserVerified;
    private double total;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public boolean isUserVerified() {return isUserVerified;}

    public void setUserVerified(boolean userVerified) {isUserVerified = userVerified;}

    public double getTotal() {return total;}

    public void setTotal(double total) {this.total = total;}

    public Long getOrderId() {return orderId;}

    public void setOrderId(Long orderId) {this.orderId = orderId;}

    @Override
    public String toString() {
        return "Checkout{" +
                "orderId=" + orderId +
                ", address='" + address + '\'' +
                ", products=" + products +
                ", isUserVerified=" + isUserVerified +
                ", total=" + total +
                '}';
    }
}
