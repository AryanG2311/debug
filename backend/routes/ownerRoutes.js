import express from "express";
import { Owner } from "../model/owner.model.js";
import { Cow } from "../model/cow.model.js";

const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const { name, email, contact, address } = req.body;

    // Check if the owner already exists by email
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: "Owner with this email already exists" });
    }

    // Create new owner
    const newOwner = new Owner({
      name,
      email,
      contact,
      address,
    });

    const savedOwner = await newOwner.save();

    res.status(201).json({ message: "Owner added successfully", owner: savedOwner });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/:ownerId/cows", async (req, res) => {
    try {
      const { ownerId } = req.params;
  
      // Check if owner exists
      const owner = await Owner.findById(ownerId);
      if (!owner) {
        return res.status(404).json({ message: "Owner not found" });
      }
  
      // Fetch all cows that belong to the owner
      const cows = await Cow.find({ ownerId });
  
      res.status(200).json(cows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


export default router;
