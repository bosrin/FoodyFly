import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaCamera, FaShoppingBag } from "react-icons/fa";
import "./Profile.css";

export default function Profile({ userInfo, setUserInfo, orderHistory }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
    profilePic: "https://via.placeholder.com/120",
  });

  // ✅ Load user info from props or localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("foodyfly_userInfo"));
    if (savedUser) {
      setLocalUser(savedUser);
      setUserInfo && setUserInfo(savedUser);
    } else if (userInfo) {
      setLocalUser(userInfo);
    }
  }, [userInfo, setUserInfo]);

  // ✅ Save profile info
  const handleSave = () => {
    setIsEditing(false);
    setUserInfo(localUser);
    localStorage.setItem("foodyfly_userInfo", JSON.stringify(localUser));
    alert("✅ Profile updated successfully!");
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalUser((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  // ✅ Filter orders for current user
  const userOrders =
    orderHistory?.filter(
      (order) =>
        order.userName?.toLowerCase() === localUser?.name?.toLowerCase()
    ) || [];

  return (
    <div className="personal-info-container">
      <h2 className="section-title">👤 Personal Information</h2>

      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-pic-wrapper">
          <img
            src={localUser?.profilePic || "https://via.placeholder.com/120"}
            alt="Profile"
            className="profile-pic"
          />
          {isEditing && (
            <>
              <label htmlFor="file-upload" className="upload-icon">
                <FaCamera />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </>
          )}
        </div>

        {/* Info Fields */}
        <div className="info-section">
          <div className="info-row">
            <FaUser className="info-icon" />
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={localUser?.name || ""}
                onChange={handleChange}
                className="info-input"
              />
            ) : (
              <p>{localUser?.name || "Name not set"}</p>
            )}
          </div>

          <div className="info-row">
            <FaEnvelope className="info-icon" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={localUser?.email || ""}
                onChange={handleChange}
                className="info-input"
              />
            ) : (
              <p>{localUser?.email || "Email not set"}</p>
            )}
          </div>
        </div>

        {/* Edit / Save Buttons */}
        <div className="button-section">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Order History */}
      <div className="order-history-section">
        <h2 className="section-title">
          <FaShoppingBag /> Order History
        </h2>

        {userOrders.length > 0 ? (
          <div className="order-list">
            {userOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <strong>Order ID:</strong> {order.id}
                </div>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Items:</strong> {order.items.join(", ")}
                </p>
                <p>
                  <strong>Total:</strong> ৳{order.total}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-orders">No orders found for this user.</p>
        )}
      </div>
    </div>
  );
}
