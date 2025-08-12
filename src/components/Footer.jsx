import React from 'react';
// import './Footer.css'; // Optional if you want to customize

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container text-center">
        <p className="mb-1">🍴 DeliciousBite &copy; {new Date().getFullYear()}</p>
        <p className="mb-0">Crafted with ❤️ for food lovers</p>
      </div>
    </footer>
  );
};

export default Footer;
