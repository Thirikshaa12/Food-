import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import products from '../data/products.json'; // Adjust path if needed

export const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        const found = res.data.find(p => p._id === id);
        if (found) setSelectedProduct(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!selectedProduct) return <div className="product-detail-container">Loading...</div>;

  const related = products.filter(p => p.category === selectedProduct.category && p._id !== selectedProduct._id);

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img
          src={`http://localhost:5000${selectedProduct.image}`}
          alt={selectedProduct.title}
          className="product-main-image"
        />
        <div className="product-info">
          <h2>{selectedProduct.title}</h2>
          <p>{selectedProduct.description}</p>
          <h3>₹{selectedProduct.price}</h3>
<button onClick={() => navigate('/ordernow', { state: { product: selectedProduct } })}>
  Order Now
</button>        </div>
      </div>

      <h3 className="related-title">More {selectedProduct.category}s</h3>
      <div className="related-images">
        {related.map(product => (
          <img
            key={product._id}
            src={`http://localhost:5000${product.image}`}
            alt={product.title}
            className="related-img"
            onClick={() => handleImageClick(product)}
          />
        ))}
      </div>
    </div>
  );
};
