import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlusCircle, FaUtensils, FaClipboardList } from "react-icons/fa";
import "./AdminProfile.css";

export default function AdminDashboard() {
  // --- Menu Management ---
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  // --- Order Management ---
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [notifications, setNotifications] = useState([]);

  // --- Dashboard Section Tabs ---
  const [activeTab, setActiveTab] = useState("menu");

  // ✅ Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await axios.get("/api/menu");
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();

    // Load orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || {};
    const allOrdersArray = Object.values(allOrders).flat();
    setOrders(allOrdersArray);
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update Menu item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`/api/menu/${editId}`, formData);
        alert("✅ Menu item updated successfully!");
      } else {
        await axios.post("/api/menu", formData);
        alert("🍽️ New menu item added!");
      }
      setFormData({ name: "", price: "", category: "", image: "" });
      setEditId(null);
      fetchMenu();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // ✅ Delete menu item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`/api/menu/${id}`);
        alert("🗑️ Item removed successfully!");
        fetchMenu();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // ✅ Edit menu item
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
    });
  };

  // ✅ Order Status Update
  const updateStatus = (index, status) => {
    const newOrders = [...orders];
    newOrders[index].status = status;
    setOrders(newOrders);

    // Save to localStorage again
    localStorage.setItem(
      "orderHistory",
      JSON.stringify(
        newOrders.reduce((acc, order) => {
          if (!acc[order.userEmail]) acc[order.userEmail] = [];
          acc[order.userEmail].push(order);
          return acc;
        }, {})
      )
    );

    addNotification(`Order #${newOrders[index].id} marked as ${status}`);
  };

  // ✅ Notifications
  const addNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
  };

  // ✅ Filter Orders
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">🍽️ Admin Dashboard</h2>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={activeTab === "menu" ? "active-tab" : ""}
          onClick={() => setActiveTab("menu")}
        >
          <FaUtensils /> Menu Management
        </button>
        <button
          className={activeTab === "orders" ? "active-tab" : ""}
          onClick={() => setActiveTab("orders")}
        >
          <FaClipboardList /> Order Management
        </button>
      </div>

      {/* --- Menu Management --- */}
      {activeTab === "menu" && (
        <>
          <h3 className="dashboard-subtitle">Manage Menu Items</h3>
          <form className="menu-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Drinks, Dessert)"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />

            <button type="submit" className="submit-btn">
              {editId ? (
                <>
                  <FaEdit /> Update Item
                </>
              ) : (
                <>
                  <FaPlusCircle /> Add Item
                </>
              )}
            </button>
          </form>

          <table className="menu-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price (৳)</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No items found
                  </td>
                </tr>
              ) : (
                menuItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img src={item.image} alt={item.name} className="menu-img" />
                    </td>
                    <td>{item.name}</td>
                    <td>৳{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}

      {/* --- Order Management --- */}
      {activeTab === "orders" && (
        <>
          <h3 className="dashboard-subtitle">Manage Orders</h3>

          <div className="menu-form">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <table className="menu-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6">No orders found.</td>
                </tr>
              )}
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.userEmail}</td>
                  <td>
                    {order.items.map((i) => (
                      <div key={i.name}>
                        {i.name} x {i.quantity}
                      </div>
                    ))}
                  </td>
                  <td>৳{order.total.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => updateStatus(index, "preparing")}
                    >
                      Preparing
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => updateStatus(index, "delivered")}
                    >
                      Delivered
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => updateStatus(index, "canceled")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="notifications">
            {notifications.map((note, i) => (
              <div key={i} className="notification">
                🔔 {note}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
