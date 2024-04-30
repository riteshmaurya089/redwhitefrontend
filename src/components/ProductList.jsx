// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import styles from './ProductList.module.css';
import { useCart } from '../context/CartContext'; // Import useCart hook

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart, cart } = useCart(); // Access addToCart function and cart from CartContext
  const navigate = useNavigate(); // Get navigate function from useNavigate hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://red-white-backend.onrender.com/api/products');
        setProducts(response.data);

        const uniqueCategories = Array.from(new Set(response.data.map(product => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`https://red-white-backend.onrender.com/api/products/category/${category}`);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  const clearFilter = () => {
    setFilteredProducts([]);
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      alert('Item is already in the cart');
    } else {
      addToCart(product);
      navigate('/cart'); // Redirect to cart page after adding to cart
    }
  };

  return (
    <div className={styles['products-container']}>
      <h2>Products</h2>
      <div className={styles['category-buttons']}>
        {categories.map(category => (
          <button key={category} onClick={() => handleCategoryClick(category)} className={styles['category-button']}>{category}</button>
        ))}
        <button onClick={clearFilter} className={styles['clear-filter-button']}>Clear Filter</button>
      </div>
      <ul className={styles['product-list']}>
        {(filteredProducts.length === 0 ? products : filteredProducts).map(product => (
          <li key={product._id} className={styles['product-item']}>
            <Link to={`/products/${product._id}`} className={styles['product-link']}>
              <img src={product.image} alt={product.title} className={styles['product-image']} />
              <p className={styles['product-title']}>{product.title.slice(0, 15)}</p>
              <p className={styles['product-description']}>{product.description.slice(0, 20)}...</p>
              <p className={styles['product-price']}>${product.price}</p>
            </Link>
            <button className={styles['category-button']} onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
