import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderConfirmation.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  return (
    <>
      <Navbar />
      <div className="confirmation-container">
        <div className="checkmark-circle">
          <div className="checkmark">&#10004;</div>
        </div>
        <h2>Order Confirmed!</h2>
        <p>Thank you, <strong>{order?.username}</strong>! Your delicious food is on its way. 🍕</p>

        <div className="order-summary">
          <h4>Order Summary</h4>
          <p><strong>Item:</strong> {order?.productName}</p>
          <p><strong>Spice Level:</strong> {order?.spiceLevel}</p>
          {order?.toppings?.length > 0 && (
            <p><strong>Toppings:</strong> {order.toppings.join(', ')}</p>
          )}
          <p><strong>Address:</strong> {order?.address}</p>
          <p><strong>Price:</strong> ₹{order?.price}</p>
        </div>

        <button onClick={() => navigate('/menu')}>🍽️ Order More</button>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
