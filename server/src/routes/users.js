import express from "express";
import db from "../config/firestore.js";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const router = express.Router();

// Fetch user data
router.get("/:id", async (req, res) => {
  try {
    const userRef = doc(db, "users", req.params.id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      res.status(200).json(userSnap.data());
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export default router;
