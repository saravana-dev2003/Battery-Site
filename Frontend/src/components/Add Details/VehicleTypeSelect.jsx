export default function VehicleTypeInput({ value, onChange }) {
  return (
    <div>
      <label className="label">Vehicle Type</label>

      <input
        type="text"
        name="vehicleType"
        value={value}
        onChange={onChange}
        placeholder="Type vehicle type"
        className="input"
      />
    </div>
  );
}
