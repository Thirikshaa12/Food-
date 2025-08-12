import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
  title: '',
  description: '',
  price: '',
  category: '',
  image: null,
});

  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/api/orders');
    setOrders(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('price', formData.price);
    uploadData.append('category', formData.category);
    if (formData.image) uploadData.append('image', formData.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:5000/api/products/add', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setFormData({ title: '', description: '', price: '', category: '', image: null });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    image: null,
    });

  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const handleOrderDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/orders/${id}`);
    fetchOrders();
  };

  return (
    <div className="admin-dashboard dark-theme">
      <h2>🧑‍💻 Admin Dashboard</h2>

      <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Product Title" required/>

        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">{editId ? 'Update Product' : 'Add Product'}</button>
      </form>

      <hr />

      <h3>📦 Products</h3>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={`http://localhost:5000${product.image}`} alt={product.title} />
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <p><b>Category:</b> {product.category}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>

      <hr />

      <h3>🧾 Orders</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h4>👤 {order.username}</h4>
            <p>📧 {order.userEmail}</p>
            <p>📦 Items: {order.items?.map(item => item.name).join(', ')}</p>
            <p>🕒 {new Date(order.createdAt).toLocaleString()}</p>
            <button onClick={() => handleOrderDelete(order._id)}>Delete Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
