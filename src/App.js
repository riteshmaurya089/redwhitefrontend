// src/App.js
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
  return (
      <div>
        <Routes>
          <Route  path="/" element={<ProductList/>} />
          <Route  path="/products/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout />} /> 
          </Routes>
      </div>
      
  );
};

export default App;
