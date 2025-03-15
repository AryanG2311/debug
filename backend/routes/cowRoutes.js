import express from "express";
import {Cow} from "../model/cow.model.js";
import {Owner} from "../model/owner.model.js";
import {generateBreedingRecommendation} from "../model/services/geminiService.js";  
const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const { 
      ownerId, name, tagNumber, genetic, physical, health, 
    } = req.body;

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    
    const existingCow = await Cow.findOne({ tagNumber });
    if (existingCow) {
      return res.status(400).json({ message: "Cow with this tag number already exists" });
    }

    // Create a new cow
    const newCow = new Cow({
      ownerId,
      name,
      tagNumber,
      genetic,
      physical,
      health,
    });

    // Save cow to database
    const savedCow = await newCow.save();

    // Add cow ID to owner's cow list
    owner.cows.push(savedCow._id);
    await owner.save();

    res.status(201).json({ message: "Cow added successfully", cow: savedCow });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/:cowid/cows", async (req, res) => {
    try {
      const { cowid } = req.params;
  
      const cow = await Cow.findById(cowid);
      if (!cow) {
        return res.status(404).json({ message: "cow not found" });
      }  
      generateBreedingRecommendation(cow)
      .then((recommendation) => {
        res.status(200).json({ cow, recommendation });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  );
 


export default router;
