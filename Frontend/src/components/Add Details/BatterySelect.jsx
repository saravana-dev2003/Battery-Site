export default function BatterySelect({ value, onChange }) {
  const batteries = [
    "Amaron",
    "Exide",
    "SF",
    "Elito",
    "TATA",
    "Livfast"
  ];

  return (
    <div>
      <label className="label">Battery</label>

      <select
        name="battery"
        value={value}
        onChange={onChange}
        className="input"
      >
        <option value="">Select Battery</option>

        {batteries.map(battery => (
          <option key={battery} value={battery}>
            {battery}
          </option>
        ))}
      </select>
    </div>
  );
}
