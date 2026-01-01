export default function WarrantySelect({ value, onChange }) {
  const months = [6, 12, 18, 24, 36, 48,60,72];

  return (
    <div>
      <label className="label">Warranty Months</label>
      <select
        name="warrantyMonths"
        value={value}
        onChange={onChange}
        className="input"
      >
        <option value="">Select Warranty</option>
        {months.map(m => (
          <option key={m} value={m}>{m} Months</option>
        ))}
      </select>
    </div>
  );
}
