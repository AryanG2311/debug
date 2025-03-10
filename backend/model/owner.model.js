import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  farmName: { type: String },
  cows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cow" }] // References cows
}, { timestamps: true });

export const Owner = mongoose.model("Owner", ownerSchema);

