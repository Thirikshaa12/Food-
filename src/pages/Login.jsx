import React, { useState } from 'react';
// import './Login.css';
import './Auth.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (
      storedUser &&
      storedUser.email === loginData.email &&
      storedUser.password === loginData.password
    ) {
      localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
      alert('Login successful!');
      navigate('/menu'); // ✅ go to the homepage route defined as "/"
    }

     else {
      alert('Invalid credentials or user not registered.');
    }
  };

  return (
    <div className="auth-container">
      <Navbar />
      <div className="form-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p>New here? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
