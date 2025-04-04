import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationPage.css";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "user",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.role) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate("/");
            } else {
                const data = await response.json();
                setError(data.message || "Registration failed.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit} className="registration-card">
                <h2>Create Account</h2>

                {error && <div className="error-message">{error}</div>}

                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                />

                <label>Address</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your address"
                    rows="2"
                    required
                ></textarea>

                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationPage;