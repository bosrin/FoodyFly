import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProfile.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("menu");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data || []);
    } catch (err) {
      console.log("Error:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || {};
    const list = Object.values(savedOrders).flat() || [];
    setOrders(list);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) return;

    try {
      if (editId) {
        await axios.put(`/api/products/${editId}`, formData);
      } else {
        await axios.post("/api/products", formData);
      }

      setFormData({ name: "", price: "", category: "", image: "" });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
    });
    setEditId(item._id);
  };

  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        <h1 className="admin-title">🍽️ Admin Dashboard</h1>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            onClick={() => setActiveTab("menu")}
            className={activeTab === "menu" ? "active" : ""}
          >
            🍴 Menu Management
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={activeTab === "orders" ? "active" : ""}
          >
            🧾 Order Management
          </button>
        </div>

        {/* ---------------- MENU MANAGEMENT ---------------- */}
        {activeTab === "menu" && (
          <>
            <h2 className="section-title">Manage Menu Items</h2>

            {/* Form */}
            <form className="menu-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Item Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="number"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Category (e.g., Drinks, Dessert)"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />

              <button className="add-btn">
                <FaPlus /> {editId ? "Update Item" : "Add Item"}
              </button>
            </form>

            {/* Table */}
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-text">
                      No items found
                    </td>
                  </tr>
                ) : (
                  products.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.image || "https://via.placeholder.com/60"}
                          className="item-img"
                          alt=""
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}৳</td>
                      <td>{item.category}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(item)}>
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

        {/* ---------------- ORDER MANAGEMENT ---------------- */}
        {activeTab === "orders" && (
          <>
            <h2 className="section-title">Manage Orders</h2>

            <table className="menu-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Email</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-text">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, i) => (
                    <tr key={i}>
                      <td>{order.id}</td>
                      <td>{order.userEmail}</td>
                      <td>
                        {order.items?.map((x, idx) => (
                          <div key={idx}>
                            {x.name} × {x.quantity}
                          </div>
                        ))}
                      </td>
                      <td>৳{order.total?.toFixed(2)}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
