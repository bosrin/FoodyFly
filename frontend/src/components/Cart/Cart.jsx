import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart({ cart = [], addToCart, removeFromCart, clearCart, addOrder }) {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: "ORD-" + Date.now(),
      date: new Date().toLocaleString(),
      items: cart.map((item) => `${item.name} x${item.quantity}`),
      total,
    };

    if (addOrder) addOrder(newOrder); // <-- now adds to parent state

    setOrderPlaced(true);
    clearCart();

    setTimeout(() => {
      setOrderPlaced(false);
      navigate("/");
    }, 2500);
  };

  return (
    <section className="cart-section">
      <h2>Your Cart</h2>

      {orderPlaced ? (
        <div className="order-success">
          <h3>🎉 Order Placed Successfully!</h3>
          <p>Thank you for your purchase. Your delicious meal is on the way 🍽️</p>
        </div>
      ) : cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty 🍽</p>
          <button onClick={() => navigate("/menu")}>Go to Menu</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.img} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>
                    ৳{item.price} × {item.quantity} = ৳{item.price * item.quantity}
                  </p>
                  <div className="quantity-controls">
                    <button onClick={() => removeFromCart(item.name)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.name, true)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ৳{total}</h3>
            <div className="cart-actions">
              <button onClick={() => navigate("/menu")}>Go Back</button>
              <button onClick={clearCart}>Clear Cart</button>
              <button className="checkout-btn" onClick={handleOrder}>
                Proceed to Order
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
