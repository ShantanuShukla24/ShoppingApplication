import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AddReviewPage = () => {
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get('source');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            setMessage('Please enter your review.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const productResponse = await fetch(`http://localhost:8080/products/review/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: comment,
            });
            const productData = await productResponse.json();

            // User Feedback API
            const feedbackResponse = await fetch('http://localhost:8080/users/feedbacks', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: comment,
            });
            const feedbackData = await feedbackResponse.json();

            setMessage('Review submitted successfully!');
            setComment('');

            // Redirect after success
            setTimeout(() => {
                navigate('/products');
            }, 1000);
        } catch (error) {
            setMessage('Failed to submit review. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            setMessage('Please enter your review.');
            return;
        }
        setLoading(true);
        setMessage('');
        try {
            // Order Review API
            const orderResponse = await fetch(`http://localhost:8080/checkout/orderReview/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: comment,
            });
            const orderData = await orderResponse.text();

            setMessage('Review submitted successfully!');
            setComment('');

            // Redirect after success
            setTimeout(() => {
                navigate('/products');
            }, 1000);
        } catch (error) {
            setMessage('Failed to submit review. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <div style={{
                width: '420px',
                padding: '25px',
                background: 'linear-gradient(135deg, #667eea, #764ba2, #e55d87)',
                boxShadow: '0 0 12px rgba(0,0,0,0.2)',
                borderRadius: '8px'
            }}>
                <h2 style={{ marginBottom: '15px' }}>Add Your Review</h2>
                <form>
                    <textarea
                        rows="5"
                        style={{
                            width: '95%',
                            padding: '10px',
                            marginTop: '10px',
                            marginBottom: '20px',
                            resize: 'vertical',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                        }}
                        placeholder="Write your review here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <button
                            onClick={handleSubmit}
                            disabled={loading || source === 'checkout'}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: 'blue',
                                color: 'white',
                                border: 'none',
                                cursor: loading || source === 'checkout' ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                opacity: loading || source === 'checkout' ? 0.5 : 1,
                            }}
                        >
                            {loading ? 'Submitting...' : 'Submit Product Review'}
                        </button>
                        <button
                            onClick={handleOrderSubmit}
                            disabled={loading || source === 'products'}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: 'green',
                                color: 'white',
                                border: 'none',
                                cursor: loading || source === 'products' ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                opacity: loading || source === 'products' ? 0.5 : 1,
                            }}
                        >
                            {loading ? 'Submitting...' : 'Submit Order Review'}
                        </button>
                    </div>
                </form>
                {message && <p style={{ marginTop: '10px', color: 'black' }}>{message}</p>}
            </div>
        </div>
    );
};

export default AddReviewPage;