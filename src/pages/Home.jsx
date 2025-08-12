import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar  from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-white">
  <div className="container text-center">
    <h1 className="display-4 fw-bold">Delicious Moments Await</h1>
    <p className="lead">Order your favorite meals from the comfort of your home</p>
    <Link to="/menu" className="btn btn-warning btn-lg mt-3 px-4">Explore Menu</Link>
  </div>
</section>


      {/* Featured Section */}
      <section className="featured-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Dishes</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card featured-card">
                <img src="/uploads/burger.jpg" alt="Cheesy Burger" />
                <div className="card-body text-center">
                  <h5 className="card-title">Cheesy Burger</h5>
                  <p className="card-text font-weight-bold">Mouth-watering cheesy burger with crispy fries.</p>
                </div>
              </div>

            </div>
            <div className="col-md-4">
              <div className="card featured-card">
                <img src="/uploads/pepperoni.jpeg" alt="Cheesy Burger" />
                <div className="card-body text-center">
                  <h5 className="card-title">Pepperoni Pizza</h5>
                  <p className="card-text font-weight-bold">Hot and fresh pizza with pepperoni</p>
                </div>
              </div>

            </div>
            <div className="col-md-4">
              
              <div className="card featured-card">
                <img src="/uploads/pasta.jpg" alt="Cheesy Burger" />
                <div className="card-body text-center">
                  <h5 className="card-title">Italian Pasta</h5>
                  <p className="card-text font-weight-bold">Creamy Alfredo pasta with herbs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info/CTA Section */}
      <section className="cta-section text-white py-5">
        <div className="container text-center">
          <h2>Hungry Yet?</h2>
          <p>Place your order now and enjoy lightning-fast delivery!</p>
          <Link to="/menu" className="btn btn-outline-light btn-lg">Order Now</Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
