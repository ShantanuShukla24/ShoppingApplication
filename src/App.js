import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/login';
import Products from './components/products';
import ProductDetails from './components/productDetails';
import RegistrationPage from './components/registrationPage';
import Review from "./components/review";
import Checkout from "./components/checkout";
import AdminDashboard from "./components/adminDashboard";
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails addToCart={handleAddToCart} />} />
                <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
                <Route path="/user-registration" element={<RegistrationPage />} />
                <Route path="/review/:id" element={<Review />} />
                <Route path="/adminDashboard" element={<AdminDashboard />}/>
            </Routes>
        </Router>
    );
}

export default App;