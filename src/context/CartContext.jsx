// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex !== -1) {
      // Product already exists in the cart
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity++;
      setCart(updatedCart);
    } else {
      // Product is added for the first time
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = [...cart];
    const productToUpdate = updatedCart.find(item => item._id === productId);
    productToUpdate.quantity++;
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = [...cart];
    const productToUpdate = updatedCart.find(item => item._id === productId);
    if (productToUpdate.quantity > 1) {
      productToUpdate.quantity--;
      setCart(updatedCart);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
