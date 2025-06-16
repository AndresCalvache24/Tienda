import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BaseTemplate from './templates/BaseTemplate';
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <BaseTemplate>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BaseTemplate>
  );
};

export default App; 