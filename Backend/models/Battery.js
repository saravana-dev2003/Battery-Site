import mongoose from "mongoose";

const batterySchema = new mongoose.Schema({
  name: String,
  phone: String,
  place: String,

  vehicleType: String,     
  vehicleNumber: String,    

  battery: String,
  model: String,
  serial: String,
  warrantyMonths: Number,
  saleDate: String,
  expiryDate: String
});

export default mongoose.model("Battery", batterySchema);
