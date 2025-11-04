import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Account from "./components/Account/Account";
import AdminProfile from "./components/AdminProfile/AdminProfile";

function App() {
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("userInfo")) || {
        name: "",
        email: "",
        address: "",
        profilePic: "https://via.placeholder.com/120",
      }
    );
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || {};
    return userInfo.email && allOrders[userInfo.email]
      ? allOrders[userInfo.email]
      : [];
  });

  // ✅ Sync localStorage whenever userInfo or orderHistory changes
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || {};
    if (userInfo.email) {
      allOrders[userInfo.email] = orderHistory;
      localStorage.setItem("orderHistory", JSON.stringify(allOrders));
    }
  }, [userInfo, orderHistory]);

  // ✅ Add to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.name === item.name);
      if (existingItem) {
        return prevCart.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // ✅ Remove from cart
  const removeFromCart = (itemName, removeAll = false) => {
    setCart((prevCart) =>
      prevCart
        .map((i) => {
          if (i.name === itemName) {
            if (removeAll || i.quantity === 1) return null;
            return { ...i, quantity: i.quantity - 1 };
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  // ✅ Clear cart
  const clearCart = () => setCart([]);

  // ✅ Add order to history
  const addOrder = (newOrder) => {
    setOrderHistory((prevHistory) => [newOrder, ...prevHistory]);
    clearCart();
    console.log("✅ Order added:", newOrder);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* ✅ User Profile */}
        <Route
          path="/profile"
          element={
            <Profile
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              orderHistory={orderHistory}
            />
          }
        />

        {/* ✅ Cart */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              addOrder={addOrder}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
