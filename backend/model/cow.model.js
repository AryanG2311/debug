import mongoose from "mongoose";

const cowSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  name: { type: String, required: true },
  tagNumber: { type: String, unique: true, required: true },
  genetic: {
    breedType: String,
    pedigreeInfo: String,
    feedingPlan: String,
    climaticSuitability: String,
    geneticDiversityScore: Number,
  },
  physical: {
    age: Number,
    bodyConditionScore: Number,
    weight: Number,
    height: Number,
  },
  health: {
    reproductiveHealth: String,
    diseaseResistance: Number,
    milkYield: Number,
    milkFat: Number,
    milkProtein: Number,
    expectedCalvingDate: Date,
    lastBreedingDate: Date,

  },
}, { timestamps: true });

export const Cow = mongoose.model("Cow", cowSchema);  // ✅ Named export
