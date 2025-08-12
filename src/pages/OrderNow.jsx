import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './OrderNow.css';

const OrderNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    username: '',
    address: '',
    spiceLevel: 'Medium',
    toppings: [],
    instructions: ''
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setFormData((prev) => ({ ...prev, username: loggedInUser.name }));
    }
  }, [navigate]);

  const handleToppingChange = (topping) => {
    setFormData((prev) => {
      const toppings = prev.toppings.includes(topping)
        ? prev.toppings.filter((t) => t !== topping)
        : [...prev.toppings, topping];
      return { ...prev, toppings };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      productId: product._id,
      productName: product.title,
      price: product.price,
      username: formData.username,
      address: formData.address,
      spiceLevel: formData.spiceLevel,
      toppings: formData.toppings,
      instructions: formData.instructions,
      image: product.image
    };

    try {
      await axios.post('http://localhost:5000/api/orders/add', orderDetails);
      navigate('/order-confirmation', {
        state: { order: orderDetails }  // ✅ Send full order object
      });
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order.');
    }
  };

  const isPizzaOrSide = ['Pizza', 'Side'].some((cat) =>
    product?.category?.toLowerCase().includes(cat.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="order-container">
        <div className="order-card">
          <img src={`http://localhost:5000${product?.image}`} alt={product?.title} />
          <h2>{product?.title}</h2>
          <p>{product?.description}</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={formData.username}
              placeholder="Your Name"
              readOnly
              className="readonly-input"
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />

            <label>Spice Level:</label>
            <select
              value={formData.spiceLevel}
              onChange={(e) => setFormData({ ...formData, spiceLevel: e.target.value })}
            >
              <option>Mild</option>
              <option>Medium</option>
              <option>Hot</option>
            </select>

            {isPizzaOrSide && (
              <>
                <label>Extra Toppings:</label>
                <div className="checkbox-group">
                  {['Cheese', 'Olives', 'Jalapeños', 'Paneer', 'Peppers'].map((topping) => (
                    <label key={topping}>
                      <input
                        type="checkbox"
                        value={topping}
                        checked={formData.toppings.includes(topping)}
                        onChange={() => handleToppingChange(topping)}
                      />
                      {topping}
                    </label>
                  ))}
                </div>
              </>
            )}

            <textarea
              name="instructions"
              placeholder="Special instructions (optional)"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            />

            <button type="submit">Place Order</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderNow;
