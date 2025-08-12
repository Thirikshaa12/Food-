import React, { useState } from 'react';
// import './Register.css';
import './Auth.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('registeredUser', JSON.stringify(userData));
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <Navbar />
      <div className="form-card">
        <h2>Create New Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already Registered? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
