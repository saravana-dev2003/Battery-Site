import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import batteryRoutes from "./routes/batteryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/batterydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/batteries", batteryRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
