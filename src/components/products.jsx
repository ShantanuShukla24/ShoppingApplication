import React, { useState, useEffect } from 'react';
import productImg from '../assets/product.png';
import Chatbot from './chatbot'
import { useNavigate } from 'react-router-dom';


const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/products/getAllProducts')
            .then(response => response.json())
            .then(data => {
                console.log('API Response:', data);
                // Adjust depending on actual API structure
                if (Array.isArray(data)) {
                    setProducts(data.slice(0, 30));
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products.slice(0, 30));
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const handleReview = (id) => {
        navigate(`/review/${id}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Products</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', columnGap: '20px', rowGap: '30px' }}>
                {products.map(product => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <img
                            src={productImg}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                marginBottom: '10px'
                            }}
                        />
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>${product.price.toFixed(2)}</strong></p>
                        </div>
                        <button
                            onClick={() => handleViewDetails(product.id)}
                        >
                            View Details
                        </button>
                        <button onClick={() => handleReview(product.id)}>
                            Review
                        </button>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-5 left-5 z-50">
                <Chatbot />
            </div>
        </div>
    );
};

export default ProductGrid;