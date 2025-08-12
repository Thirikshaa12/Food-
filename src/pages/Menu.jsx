import React, { useState, useEffect } from "react";
import axios from "axios";
import './Menu.css';
import { Link } from "react-router-dom";

const categories = ["All", "Pizza", "Sides", "Drinks"];

export const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredProducts = filter === "All"
    ? products
    : products.filter(product => product.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="menu-container">
      <h1 className="menu-title">Explore Our Menu</h1>
      <div className="menu-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredProducts.map((item) => (
            <div className={`menu-card ${item.category.toLowerCase()}`} key={item._id}style={{ backgroundImage: `url(http://localhost:5000${item.image})` }}>

            <div className="menu-card-content">
              <h3>{item.title}</h3>
              <p>{item.description.slice(0, 100)}...</p>
              <p>₹{item.price}</p>
              <Link to={`/product/${item._id}`} className="view-more">View More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
