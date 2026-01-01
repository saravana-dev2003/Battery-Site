export default function DateFields({ saleDate, expiryDate, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="label">Date of Sale</label>
        <input
          type="date"
          name="saleDate"
          value={saleDate}
          onChange={onChange}
          className="input"
        />
      </div>

      <div>
        <label className="label">Warranty Expiry</label>
        <input
          type="date"
          value={expiryDate}
          readOnly
          className="input bg-gray-100"
        />
      </div>
    </div>
  );
}
