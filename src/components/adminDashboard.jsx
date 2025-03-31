import React, { useState } from "react";
import "../styles/AdminDashboard.css";

const fetchProductSentiments = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8080/products/review/${productId}`);
        return await response.text(); // Return text instead of JSON
    } catch (error) {
        console.error("Error fetching product sentiments:", error);
        return "Error fetching data";
    }
};

const fetchOrderSentiments = async (orderId) => {
    try {
        const response = await fetch(`http://localhost:8080/checkout/orderReview/${orderId}`);
        return await response.text(); // Return text instead of JSON
    } catch (error) {
        console.error("Error fetching order sentiments:", error);
        return "Error fetching data";
    }
};

const fetchUserByEmail = async (email) => {
    try {
        const response = await fetch(`http://localhost:8080/users/findByEmail?email=${encodeURIComponent(email)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

const AdminDashboard = () => {
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState(null);
    const [productSentimentData, setProductSentimentData] = useState(null);
    const [orderSentimentData, setOrderSentimentData] = useState(null);
    const [productId, setProductId] = useState("");
    const [orderId, setOrderId] = useState("");

    const handleSearchUser = async () => {
        const data = await fetchUserByEmail(email);
        setUserData(data);
    };

    const handleGetProductSentiments = async () => {
        if (!productId) {
            alert("Please enter a Product ID");
            return;
        }
        const data = await fetchProductSentiments(productId);
        setProductSentimentData(data);
    };

    const handleGetOrderSentiments = async () => {
        if (!orderId) {
            alert("Please enter an Order ID");
            return;
        }
        const data = await fetchOrderSentiments(orderId);
        setOrderSentimentData(data);
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Admin Dashboard</h2>
            <div className="search-section">
                <input
                    type="email"
                    placeholder="Search user by email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleSearchUser} className="action-button">Search</button>
            </div>
            {userData && (
                <div className="identity-card">
                    <h3>User Details</h3>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Address:</strong> {userData.address}</p>
                </div>
            )}
            <div className="search-section">
                <input
                    type="number"
                    placeholder="Enter Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleGetProductSentiments} className="action-button">Get Product Sentiments</button>
            </div>
            {productSentimentData && (
                <div className="sentiment-card">
                    <h3>Product Sentiments</h3>
                    <p>{productSentimentData}</p>
                </div>
            )}
            <div className="search-section">
                <input
                    type="number"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleGetOrderSentiments} className="action-button">Get Order Sentiments</button>
            </div>
            {orderSentimentData && (
                <div className="sentiment-card">
                    <h3>Order Sentiments</h3>
                    <p>{orderSentimentData}</p>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;