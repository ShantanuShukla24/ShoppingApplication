import React, { useState } from 'react';
import Chatbot from './chatbot';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems }) => {
    const [checkoutDetails, setCheckoutDetails] = useState(null);

    const navigate = useNavigate();

    const handleCheckout = () => {
        // Prepare payload with just product list
        const checkoutPayload = cartItems;


        fetch('http://localhost:8080/checkout/checkoutDetails', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checkoutPayload)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Checkout Response:', data);
                setCheckoutDetails(data);
            })
            .catch(error => {
                console.error('Checkout Error:', error);
                alert('Checkout Failed!');
            });
    };

    const handleAddReview = () => {
        navigate(`/review/${checkoutDetails.orderId}?source=checkout`);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', textAlign: 'center' }}>
            <h2>Checkout</h2>

            {/* Show cart items */}
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        style={{ padding: '10px 20px', marginTop: '20px' }}
                    >
                        Confirm Order
                    </button>
                </>
            )}

            {/* Show Checkout Response */}
            {checkoutDetails && (
                <div style={{ marginTop: '30px' }}>
                    <h3>Order Confirmed!</h3>
                    <p><strong>Order ID:</strong> {checkoutDetails.orderId}</p>
                    <p><strong>Address:</strong> {checkoutDetails.address}</p>
                    <p><strong>Total:</strong> ${checkoutDetails.total ? checkoutDetails.total.toFixed(2) : '0.00'}</p>
                    <button
                        onClick={handleAddReview}
                        style={{ padding: '10px 20px', marginTop: '20px' }}
                    >
                        Add Review
                    </button>
                </div>
            )}
            <div className="fixed bottom-5 left-5 z-50">
                <Chatbot />
            </div>
        </div>
    );
};

export default Checkout;