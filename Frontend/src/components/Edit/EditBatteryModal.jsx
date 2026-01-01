import { useState } from "react";
import { updateBattery } from "../../api/batteryApi";

export default function EditBatteryModal({ battery, onClose, onSaved }) {
  const [form, setForm] = useState({ ...battery });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await updateBattery(form._id, form);
      onSaved(res.data);   // update table
      onClose();           // close modal
    } catch {
      alert("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-4 rounded shadow">

        <h3 className="text-lg font-semibold mb-3">
          Edit Battery
        </h3>

        <div className="space-y-2 text-sm">
          <input
            className="input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Customer Name"
          />

          <input
            className="input"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <input
            className="input"
            name="vehicleNumber"
            value={form.vehicleNumber}
            onChange={handleChange}
            placeholder="Vehicle Number"
          />

          <input
            className="input"
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Battery Model"
          />

          <input
            type="date"
            className="input"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}
