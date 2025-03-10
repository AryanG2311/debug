import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cowRoutes from "./routes/cowRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const app = express();
app.use(express.json()); 


// Update CORS configuration to allow requests from 'http://localhost:5173'
app.use(cors({ 
  origin: "http://localhost:5173", // Change this to your frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true // Allow cookies if needed
}));

app.use("/api/cows", cowRoutes);
app.use("/api/owners", ownerRoutes); 




const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
