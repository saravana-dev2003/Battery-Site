export default function VehicleNumberInput({ value, onChange }) {
  return (
    <div>
      <label className="label">Vehicle Number</label>
      <input
        type="text"
        name="vehicleNumber"
        placeholder="TN 09 AB 1234"
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  );
}
