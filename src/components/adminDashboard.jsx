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

const updateUserByEmail = async (updatedData) => {
    try {
        const response = await fetch(`http://localhost:8080/users/updateUser`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating user:", error);
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
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", address: "", role: "User" });

    const handleSearchUser = async () => {
        const data = await fetchUserByEmail(email);
        if (data) {
            setUserData(data);
            setFormData({
                name: data.name,
                email: data.email,
                address: data.address || "",
                role: data.role || "User"
            });
        } else {
            setError("User not found.");
        }
    };

    const handleModifyUser = () => {
        setEditMode(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.email) {
            setError("User email is missing.");
            return;
        }
        const result = await updateUserByEmail(formData);
        if (result) {
            alert("User details updated successfully!");
            setEditMode(false);
            handleSearchUser(); // Refresh user data
        } else {
            setError("Error updating user.");
        }
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
                    <p><strong>Role:</strong> {userData.role}</p>
                    <button onClick={handleModifyUser} className="action-button">Modify User</button>
                </div>
            )}
            {editMode && (
                <div className="identity-card">
                    <h3>Edit User Details</h3>
                    <div style={{display:"flex", justifyContent:"left",alignItems:"center",padding:"2px",margin:"3px",width:"100%"}}>
                        <label style={{padding:"2px"}}>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" />
                    </div>
                    <div style={{display:"flex", justifyContent:"left",alignItems:"center",padding:"2px",margin:"3px",width:"100%"}}>
                        <label style={{padding:"2px"}}>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" disabled />
                    </div>
                    <div style={{display:"flex", justifyContent:"left",alignItems:"center",padding:"2px",margin:"3px",width:"100%"}}>
                        <label style={{padding:"2px"}}>Address:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" />
                    </div>
                    <div style={{display:"flex", justifyContent:"left",alignItems:"center",padding:"2px",margin:"3px",width:"100%"}}>
                        <label style={{padding:"2px"}}>Role:</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="input-field">
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div style={{display:"flex", justifyContent:"left",alignItems:"center",padding:"2px",margin:"3px",width:"100%"}}>
                        <button style={{padding:"3px",border:"2px",margin:"2px",background:"green"}} onClick={handleSubmit} className="action-button">Submit</button>
                        <button style={{padding:"3px",border:"2px",margin:"2px",background:"red"}} onClick={() => setEditMode(false)} className="action-button">Cancel</button>
                    </div>
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