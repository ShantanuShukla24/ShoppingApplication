import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productImg from '../assets/product.png'
import Chatbot from './chatbot'

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cartMessage, setCartMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/products/getProduct/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                productId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: 1
            });
            setCartMessage('Product added to cart!');
        }
    };

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
            <h2>{product.name}</h2>
            <img
                src={productImg}
                alt={product.name}
                style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>ID:</strong> {product.id}</p>

            <button
                onClick={handleAddToCart}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Add to Cart
            </button>

            {cartMessage && <p style={{ marginTop: '10px' }}>{cartMessage}</p>}

            <button
                onClick={() => navigate('/checkout')}
                style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Go to Checkout
            </button>

            <Link to="/products">
                <button style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                    Back to Products
                </button>
            </Link>
            <div className="fixed bottom-5 left-5 z-50">
                <Chatbot />
            </div>
        </div>
    );
};

export default ProductDetails;