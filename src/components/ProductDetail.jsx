// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://red-white-backend.onrender.com/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className={styles['product-detail-container']}>
      <div className={styles['product-image-container']}>
        <img src={product.image} alt={product.title} className={styles['product-image']} />
      </div>
      <div className={styles['product-details']}>
        <h2 className={styles['product-title']}>{product.title}</h2>
        <p className={styles['product-price']}>Price: ${product.price}</p>
        <p className={styles['product-description']}>{product.description}</p>
        <button onClick={handleAddToCart} className={styles['add-to-cart-button']}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
