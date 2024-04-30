import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, calculateTotal } = useCart();

  const handleIncrement = (productId) => {
    incrementQuantity(productId);
  };

  const handleDecrement = (productId) => {
    decrementQuantity(productId);
  };

  const totalAmount = calculateTotal();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const discountPercentage = 10;
  const discountAmount = totalAmount * (discountPercentage / 100);
  const discountedTotal = totalAmount - discountAmount;

  return (
    <div className={styles['cart-container']}>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles['cart-content']}>
          <div className={styles['product-info-container']}>
            <table className={styles['cart-table']}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item._id}>
                    <td className={styles['product-info']}>
                      <img src={item.image} alt={item.title} className={styles['product-image']} />
                      <div>
                        <p>{item.title}</p>
                        <p>${item.price}</p>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleDecrement(item._id)}>-</button>
                      {item.quantity}
                      <button onClick={() => handleIncrement(item._id)}>+</button>
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles['price-details']}>
            <h3>Price Details</h3>
            <div>
              <span>Price ({totalQuantity} items)</span>
              <span>${totalAmount}</span>
            </div>
            <div>
              <span>Discount ({discountPercentage}% off)</span>
              <span>- ${discountAmount.toFixed(2)}</span>
            </div>
            <div>
              <h4>Delivery Charges  <strike>$70</strike><span>Free</span></h4>
             <div>
              
             <p className={styles['save-amount']}>You will save ${discountAmount.toFixed(2)} on this order</p>

              </div>
            </div>
            <hr />
            <div className={styles['total-amount']}>
              <h4>Total Amount</h4>
              <h4>${discountedTotal.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      )}
      <Link to="/checkout" className={styles['checkout-button']}>Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
