const express = require("express");
const { v4: uuidv4 } = require("uuid"); // For generating unique item IDs
const db = require("../config/firestore.js");
const router = express.Router();

// Fetch all items for a specific shopping list
router.get("/list/:listId/items", async (req, res) => {
  try {
    const listId = req.params.listId;
    const itemsRef = db.collection("shoppingListItems");
    const querySnapshot = await itemsRef.where("list_id", "==", listId).get();

    if (querySnapshot.empty) {
      return res.status(200).json([]); // Return empty array if no items found
    }

    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Items fetched from Firestore:", items);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching shopping list items:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new item in a shopping list
router.post("/list/:listId/items", async (req, res) => {
  try {
    const listId = req.params.listId;
    const itemId = uuidv4(); // Generate a unique ID for the item
    const itemData = {
      id: itemId,
      list_id: listId,
      name: req.body.name,
      status: req.body.status || false, // Default status to false (not completed)
      description: req.body.description || "", // Default to empty string
    };

    console.log("Item being sent to Firestore:", itemData);

    const itemRef = await db.collection("shoppingListItems").doc(itemId).set(itemData);
    res.status(201).json({ id: itemId, ...itemData });
  } catch (error) {
    console.error("Error creating shopping list item:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete an item from a shopping list
router.delete("/items/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const itemRef = db.collection("shoppingListItems").doc(itemId);

    const itemSnap = await itemRef.get();
    if (!itemSnap.exists) {
      return res.status(404).json({ message: "Item not found" });
    }

    await itemRef.delete();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting shopping list item:", error);
    res.status(500).json({ message: error.message });
  }
});

//change item status 
router.put("/items/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId; // Item ID from the route parameter
    const itemRef = db.collection("shoppingListItems").doc(itemId);

    // Update the item's status
    await itemRef.update({
      status: req.body.status, // Accept `status` from the request body
    });

    res.status(200).json({ message: "Item status updated successfully" });
  } catch (error) {
    console.error("Error updating item status:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
