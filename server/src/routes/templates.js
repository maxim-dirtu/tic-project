const express = require("express");
const db = require("../config/firestore.js");
const { doc, getDoc, collection, addDoc, updateDoc, deleteDoc } = require("firebase/firestore");

const router = express.Router();

// Fetch a grocery list
router.get("/:id", async (req, res) => {
  try {
    const listRef = doc(db, "templates", req.params.id);
    const listSnap = await getDoc(listRef);

    if (listSnap.exists()) {
      res.status(200).json(listSnap.data());
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new grocery list
router.post("/", async (req, res) => {
  try {
    const listData = req.body;
    const listRef = await addDoc(collection(db, "templates"), listData);
    res.status(201).json({ id: listRef.id, ...listData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a grocery list
router.put("/:id", async (req, res) => {
  try {
    const listRef = doc(db, "templates", req.params.id);
    await updateDoc(listRef, req.body);
    res.status(200).json({ message: "template updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a grocery list
router.delete("/:id", async (req, res) => {
  try {
    const listRef = doc(db, "template", req.params.id);
    await deleteDoc(listRef);
    res.status(200).json({ message: "template deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
