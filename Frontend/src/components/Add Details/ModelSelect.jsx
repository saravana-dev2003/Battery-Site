import { useEffect, useState } from "react";

export default function ModelSelect({ battery, value, onChange }) {
  const batteryModels = {
    Amaron: [
      "AP-BTZ4V","AP-BTZ5L","AP-BTZ7","AP-BTZ9","AP-BTZ12",
      "AAM-FL-00042B20L","AAM-FL-00042B20R",
      "AAM-FL-00055D23L","AAM-FL-00065D26L","AAM-FL-00080D26L",
      "AR150TT42","AR180TT54","AR200TT60","AR220TT60","AR250TT60"
    ],
    Exide: [
      "ML35L","ML38B20L","ML40B20L","MLDIN44","MLDIN50","MLDIN60",
      "MLDIN66","MLDIN74","MLDIN80",
      "MTRED35L","MTRED40L","MTREDDIN44","MTREDDIN60",
      "MTREDDIN74","MTREDDIN80",
      "EPIQDIN44","EPIQDIN60","EPIQDIN74","EPIQDIN80"
    ],
    SF: ["SF40B20L","SF44B20L","SFDIN44","SFDIN50","SFDIN60"],
    Elito: ["EL35L","EL38B20L","EL40B20L","EL44DIN","EL50DIN"],
    TATA: ["TATA35L","TATA38B20L","TATA40B20L","TATADIN44"],
    Livfast: ["LF35L","LF38B20L","LF40B20L","LFDIN44"]
  };

  const models = batteryModels[battery] || [];

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value || "");

  // Clear when battery changes
  useEffect(() => {
    setSearch("");
    onChange({ target: { name: "model", value: "" } });
  }, [battery]);

  const filteredModels = models.filter((m) =>
    m.toLowerCase().includes(search.toLowerCase())
  );

  const selectModel = (model) => {
    setSearch(model);
    onChange({ target: { name: "model", value: model } });
    setOpen(false);
  };

  return (
    <div className="relative">
      <label className="label">Battery Model</label>

      <input
        type="text"
        value={search}
        disabled={!battery}
        placeholder={battery ? "Type or select model" : "Select battery first"}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          onChange({ target: { name: "model", value: e.target.value } });
        }}
        className="input"
      />

      {/* DROPDOWN */}
      {open && filteredModels.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-white shadow">
          {filteredModels.map((model) => (
            <li
              key={model}
              onClick={() => selectModel(model)}
              className="cursor-pointer px-3 py-2 hover:bg-blue-100"
            >
              {model}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
