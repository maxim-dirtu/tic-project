const express = require("express");
const db = require("../config/firestore.js");
const { doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc, Timestamp } = require("firebase/firestore");
const router = express.Router();


// Fetch all Shopping lists in pending status for a certain person
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const listsRef = db.collection("shoppingLists"); 
    const querySnapshot = await listsRef.where("id_user", "==", userId).where("status", "==", false).get(); 

    if (querySnapshot.empty) {
      return res.status(200).json([]); 
    }

    const lists = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Lists fetched from Firestore:", lists);
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching shopping lists:", error);
    res.status(500).json({ message: error.message });
  }
});

//Fetch all shopping lists in finished status for a certain person
router.get("/user/:userId/finished", async (req, res) => {
  try {
    const userId = req.params.userId;
    const listsRef = db.collection("shoppingLists"); 
    const querySnapshot = await listsRef.where("id_user", "==", userId).where("status", "==", true).get(); 

    if (querySnapshot.empty) {
      return res.status(200).json([]); 
    }

    const lists = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Lists fetched from Firestore:", lists);
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching shopping lists:", error);
    res.status(500).json({ message: error.message });
  }
});

// Fetch a Shopping list by ID
router.get("/:id", async (req, res) => {
  try {
    const listRef = db.collection("shoppingLists").doc(req.params.id); 
    const listSnap = await listRef.get();

    if (!listSnap.exists) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    res.status(200).json({ id: listSnap.id, ...listSnap.data() });
  } catch (error) {
    console.error("Error fetching shopping list:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new Shopping list
router.post("/", async (req, res) => {
  try {
    const listData = {
      name: req.body.name,
      id_user: req.body.id_user,
      invited_users: req.body.invited_users || [],
      status: req.body.status || false,
      date_created: new Date(),
    };

    console.log("Data being sent to Firestore:", listData);

    const listRef = await db.collection("shoppingLists").add(listData); 
    res.status(201).json({ id: listRef.id, ...listData });
  } catch (error) {
    console.error("Firestore error details:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update a Shopping list
router.put("/:id", async (req, res) => {
  try {
    const listRef = db.collection("shoppingLists").doc(req.params.id);
    await listRef.update(req.body); 
    res.status(200).json({ message: "Shopping list updated successfully" });
  } catch (error) {
    console.error("Error updating shopping list:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a Shopping list
router.delete("/:id", async (req, res) => {
  try {
    const listRef = db.collection("shoppingLists").doc(req.params.id);
    await listRef.delete(); 

    res.status(200).json({ message: "Shopping list deleted successfully" });
  } catch (error) {
    console.error("Error deleting shopping list:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;