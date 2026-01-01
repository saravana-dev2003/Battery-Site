import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TextInput from "./TextInput";
import BatterySelect from "./BatterySelect";
import ModelSelect from "./ModelSelect";
import WarrantySelect from "./WarrantySelect";
import DateFields from "./DateFields";
import VehicleTypeSelect from "./VehicleTypeSelect";
import VehicleNumberInput from "./VehicleNumberInput";
import { createBattery } from "../../api/batteryApi";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function BatteryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    place: "",
    vehicleType: "",
    vehicleNumber: "",
    battery: "",
    model: "",
    serial: "",
    warrantyMonths: "",
    saleDate: "",
    expiryDate: "",
  });

  const [errors, setErrors] = useState({});

  /* Auto expiry date */
  useEffect(() => {
    if (form.saleDate && form.warrantyMonths) {
      const d = new Date(form.saleDate);
      d.setMonth(d.getMonth() + Number(form.warrantyMonths));
      setForm((prev) => ({
        ...prev,
        expiryDate: d.toISOString().split("T")[0],
      }));
    }
  }, [form.saleDate, form.warrantyMonths]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error
  };

  /* 🔥 VALIDATION */
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Customer name required";

    if (!form.phone.trim())
      newErrors.phone = "Phone number required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!form.place.trim()) newErrors.place = "Place required";
    if (!form.vehicleType) newErrors.vehicleType = "Select vehicle type";
    if (!form.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle number required";

    if (!form.battery) newErrors.battery = "Select battery";
    if (!form.model) newErrors.model = "Select model";
    if (!form.serial.trim())
      newErrors.serial = "Serial number required";

    if (!form.warrantyMonths)
      newErrors.warrantyMonths = "Select warranty";
    if (!form.saleDate)
      newErrors.saleDate = "Sale date required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // ❌ stop save

    try {
      await createBattery(form);
      alert("Battery saved successfully ✅");
      
      setForm({
        name: "",
        phone: "",
        place: "",
        vehicleType: "",
        vehicleNumber: "",
        battery: "",
        model: "",
        serial: "",
        warrantyMonths: "",
        saleDate: "",
        expiryDate: "",
      });
    } catch {
      alert("Save failed ❌");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4"
    >
      <motion.form
        onSubmit={handleSubmit}
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Customer Details
          </h2>
          <p className="text-sm text-gray-500">
            Enter customer & battery information
          </p>
        </motion.div>

        {/* Customer Info */}
        <motion.div variants={item} className="grid md:grid-cols-2 gap-4">
          <div>
            <TextInput label="Customer Name" name="name" onChange={handleChange} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <TextInput label="Phone Number" name="phone" onChange={handleChange} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </motion.div>

        <motion.div variants={item}>
          <TextInput label="Place" name="place" onChange={handleChange} />
          {errors.place && <p className="text-red-500 text-sm">{errors.place}</p>}
        </motion.div>

        {/* Vehicle Info */}
        <motion.div variants={item} className="grid md:grid-cols-2 gap-4">
          <div>
            <VehicleTypeSelect value={form.vehicleType} onChange={handleChange} />
            {errors.vehicleType && (
              <p className="text-red-500 text-sm">{errors.vehicleType}</p>
            )}
          </div>

          <div>
            <VehicleNumberInput value={form.vehicleNumber} onChange={handleChange} />
            {errors.vehicleNumber && (
              <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
            )}
          </div>
        </motion.div>

        {/* Battery Info */}
        <motion.div variants={item} className="grid md:grid-cols-2 gap-4">
          <div>
            <BatterySelect value={form.battery} onChange={handleChange} />
            {errors.battery && <p className="text-red-500 text-sm">{errors.battery}</p>}
          </div>

          <div>
            <ModelSelect
              battery={form.battery}
              value={form.model}
              onChange={handleChange}
            />
            {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
          </div>
        </motion.div>

        <motion.div variants={item}>
          <TextInput
            label="Battery Serial Number"
            name="serial"
            onChange={handleChange}
          />
          {errors.serial && <p className="text-red-500 text-sm">{errors.serial}</p>}
        </motion.div>

        <motion.div variants={item}>
          <WarrantySelect value={form.warrantyMonths} onChange={handleChange} />
          {errors.warrantyMonths && (
            <p className="text-red-500 text-sm">{errors.warrantyMonths}</p>
          )}
        </motion.div>

        <motion.div variants={item}>
          <DateFields
            saleDate={form.saleDate}
            expiryDate={form.expiryDate}
            onChange={handleChange}
          />
          {errors.saleDate && (
            <p className="text-red-500 text-sm">{errors.saleDate}</p>
          )}
        </motion.div>

        {/* Submit */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md"
        >
          Save Battery
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
