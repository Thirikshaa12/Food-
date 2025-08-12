import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Register  from './pages/Register';
import Login  from './pages/Login';
import Home from './pages/Home';
import { Menu } from './pages/menu';
import {ProductDetail} from './pages/ProductDetail';
import OrderNow  from './pages/OrderNow';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/ordernow" element={<OrderNow />} />
        <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>

      </Routes>
    </Router>
  );
}

export default App;
