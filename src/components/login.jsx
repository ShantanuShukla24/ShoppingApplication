import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                alert('Login successful!');
                //Change to actual path as needed
                navigate('/products');
            } else {
                setError('Invalid email or password.');
            }
        } catch (err) {
            setError('Error connecting to server.');
        }
    };
    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch('http://localhost:8080/users/adminLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData,
                credentials: 'include'
            });
            if(response.ok){
                setData(await response.text())
                alert('Login successful!');
                navigate('/adminDashboard');
            }else {
                setError(`Forbidden: ${response.status}`);
            }

        } catch (err) {
            setError('Error connecting to server.');
        }
    };
    const handleRegister = () => {
        navigate('/user-registration');
    };
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-card h2">Sign In</h2>
                <form onSubmit={handleLogin}>
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-card input"
                    />

                    <label className="label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-card input"
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-card button">Login</button>
                    <button type="button" className="login-card button" onClick={handleRegister}>Register New User</button>
                    <button type="button" className="login-card button" onClick={handleAdminLogin}>Admin Login</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

};

export default LoginPage;