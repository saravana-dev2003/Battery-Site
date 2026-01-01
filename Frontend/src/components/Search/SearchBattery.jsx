import { useEffect, useState, useRef } from "react";
import { searchBatteries, deleteBattery } from "../../api/batteryApi";
import EditBatteryModal from "../../components/Edit/EditBatteryModal";

const normalize = (str = "") =>
  str.replace(/\s+/g, "").toUpperCase();

const isExpired = (date) =>
  date && new Date(date) < new Date();

const isVehicleSearch = (q = "") =>
  /[a-zA-Z]{2}.*\d/.test(q.replace(/\s+/g, ""));

export default function SearchBattery() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // 🔑 IMPORTANT FLAG (prevents suggestion reopening)
  const skipSuggestRef = useRef(false);

  /* 🔍 AUTO SUGGEST WHILE TYPING */
  useEffect(() => {
    if (!query.trim() || skipSuggestRef.current) {
      setSuggestions([]);
      skipSuggestRef.current = false; // reset after skip
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await searchBatteries(query);
        setSuggestions(res.data || []);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  /* 🔎 SEARCH BUTTON / PROGRAMMATIC SEARCH */
  const handleSearch = async (searchValue = query) => {
    if (!searchValue.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);

      const res = await searchBatteries(searchValue);
      const data = res.data || [];

      if (isVehicleSearch(searchValue)) {
        const vn = normalize(searchValue);
        setSelectedList(
          data.filter(
            (b) => normalize(b.vehicleNumber) === vn
          )
        );
      } else {
        setSelectedList(data); // name / phone / serial
      }

      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  /* CLICK SUGGESTION */
  const handleSuggestionClick = (value) => {
    skipSuggestRef.current = true; // 🚫 stop auto suggest
    setQuery(value);
    setSuggestions([]);
    handleSearch(value);           // ✅ show details
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this battery record?")) return;
    await deleteBattery(id);
    setSelectedList((prev) =>
      prev.filter((b) => b._id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-3 md:p-6">
      <div className="bg-white max-w-7xl mx-auto p-4 md:p-6 rounded-xl shadow-sm relative">

        <h2 className="text-xl md:text-2xl font-semibold text-center mb-5 text-slate-700">
          Customer & Battery Search Details
        </h2>

        {/* SEARCH BAR */}
        <div className="flex gap-2 relative">
          <input
            type="text"
            placeholder="Name / Phone / Serial / Vehicle No"
            value={query}
            onChange={(e) => {
              skipSuggestRef.current = false;
              setQuery(e.target.value);
              setSelectedList([]);
              setHasSearched(false);
            }}
            className="flex-1 border border-slate-300 rounded-lg p-2 text-sm md:text-base"
          />

          <button
            onClick={() => handleSearch()}
            className="px-5 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-800"
          >
            Search
          </button>

          {/* 🔽 SUGGESTION DROPDOWN */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-slate-300 rounded-lg shadow mt-1 max-h-56 overflow-auto z-50">
              {suggestions.map((b) => (
                <li
                  key={b._id}
                  onClick={() =>
                    handleSuggestionClick(
                      isVehicleSearch(query)
                        ? b.vehicleNumber
                        : b.name
                    )
                  }
                  className="px-3 py-2 cursor-pointer hover:bg-slate-100 text-sm"
                >
                  <b>{b.name}</b>{" "}
                  <span className="text-slate-500">
                    ({b.vehicleNumber})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-4 text-slate-500">
            Loading...
          </p>
        )}

        {/* NOT FOUND */}
        {!loading &&
          hasSearched &&
          selectedList.length === 0 && (
            <div className="mt-6 text-center text-slate-500">
              <p className="text-lg font-medium">
                No matching records found
              </p>
              <p className="text-sm">
                Check name, phone or vehicle number
              </p>
            </div>
          )}

        {/* ================= DESKTOP TABLE ================= */}
        {selectedList.length > 0 && (
          <>
            <div className="hidden md:block overflow-x-auto mt-6">
              <table className="w-full border text-sm whitespace-nowrap">
                <thead className="bg-slate-200">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Phone</th>
                    <th className="border p-2">Vehicle</th>
                    <th className="border p-2">Battery</th>
                    <th className="border p-2">Serial</th>
                    <th className="border p-2">Expiry</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedList.map((b) => (
                    <tr
                      key={b._id}
                      className={`text-center ${
                        isExpired(b.expiryDate)
                          ? "bg-red-100 text-red-700"
                          : ""
                      }`}
                    >
                      <td className="border p-2">{b.name}</td>
                      <td className="border p-2">{b.phone}</td>
                      <td className="border p-2">
                        {b.vehicleType} – {b.vehicleNumber}
                      </td>
                      <td className="border p-2">
                        {b.battery} ({b.model})
                      </td>
                      <td className="border p-2">{b.serial}</td>
                      <td className="border p-2">
                        {b.expiryDate}
                        {isExpired(b.expiryDate) && (
                          <div className="font-bold">EXPIRED</div>
                        )}
                      </td>
                      <td className="border p-2 space-x-2">
                        <button
                          className="px-2 py-1 bg-slate-600 text-white rounded text-xs"
                          onClick={() => setEditing(b)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                          onClick={() => handleDelete(b._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden mt-5 space-y-3">
              {selectedList.map((b) => (
                <div
                  key={b._id}
                  className={`rounded-xl border p-4 ${
                    isExpired(b.expiryDate)
                      ? "bg-red-50 border-red-300"
                      : "bg-white border-slate-300"
                  }`}
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{b.name}</h3>
                    {isExpired(b.expiryDate) && (
                      <span className="text-xs font-bold text-red-600">
                        EXPIRED
                      </span>
                    )}
                  </div>

                  <div className="text-sm mt-2 space-y-1 text-slate-600">
                    <p>📞 {b.phone}</p>
                    <p>🚗 {b.vehicleType} - {b.vehicleNumber}</p>
                    <p>🔋 {b.battery} ({b.model})</p>
                    <p>🔢 {b.serial}</p>
                    <p>📅 {b.expiryDate}</p>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      className="flex-1 py-1 bg-slate-600 text-white rounded"
                      onClick={() => setEditing(b)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(b._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* EDIT MODAL */}
        {editing && (
          <EditBatteryModal
            battery={editing}
            onClose={() => setEditing(null)}
            onSaved={(updated) =>
              setSelectedList((prev) =>
                prev.map((b) =>
                  b._id === updated._id ? updated : b
                )
              )
            }
          />
        )}
      </div>
    </div>
  );
}
