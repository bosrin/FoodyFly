import express from "express";
import Menu from "../models/Menu.js";

const router = express.Router();

// ✅ Get all menu items
router.get("/", async (req, res) => {
  const menus = await Menu.find();
  res.json(menus);
});

// ✅ Add new menu item
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    const menu = new Menu({ name, description, price, category, imageUrl });
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✏️ Update menu item
router.put("/:id", async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ❌ Delete menu item
router.delete("/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
