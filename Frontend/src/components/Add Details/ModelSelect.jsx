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
      "EPIQDIN44","EPIQDIN60","EPIQDIN74","EPIQDIN80",
      "IMTT1500","IMTT1800","IMTT2000",
      "IT500","IT550","IT600",
      "IMST1500","IMST1800",
      "IP1500","IP1800",
      "OPzS Series","VRLA Series"
    ],

    SF: [
      "SF40B20L","SF44B20L","SFDIN44","SFDIN50","SFDIN60",
      "SFDIN66","SFDIN74","SFDIN80",
      "SF45","SF50","SF55","SF60","SF65","SF75","SF80",
      "STT1500","STT1800","STT2000",
      "SFTT150","SFTT180","SFTT200",
      "SFFP150","SFFP180"
    ],

    Elito: [
      "EL35L","EL38B20L","EL40B20L","EL44DIN","EL50DIN",
      "EL60DIN","EL66DIN","EL74DIN","EL80DIN",
      "ELDIN44P","ELDIN60P","ELDIN74P","ELDIN80P",
      "ELTT1500","ELTT1800","ELTT2000",
      "ELST1500","ELST1800",
      "ELFP150","ELFP180"
    ],

    TATA: [
      "TATA35L","TATA38B20L","TATA40B20L","TATADIN44","TATADIN50",
      "TATADIN60","TATADIN66","TATADIN74","TATADIN80",
      "TATADIN44P","TATADIN60P","TATADIN74P","TATADIN80P",
      "TATA90","TATA100","TATA120","TATA135","TATA150","TATA180",
      "TATATT1500","TATATT1800","TATATT2000",
      "TATAST1500","TATAST1800",
      "TATAFP150","TATAFP180"
    ],

    Livfast: [
      "LF35L","LF38B20L","LF40B20L","LFDIN44","LFDIN50",
      "LFDIN60","LFDIN66","LFDIN74","LFDIN80",
      "LFDIN44P","LFDIN60P","LFDIN74P","LFDIN80P",
      "LF90","LF100","LF120","LF135","LF150","LF180",
      "LFTT1500","LFTT1800","LFTT2000",
      "LFST1500","LFST1800",
      "LFFP150","LFFP180",
      "LFVRLA Series","LFOPzS Series","LFGenset Series"
    ]
  };

  const models = batteryModels[battery] || [];

  return (
    <div>
      <label className="label">Battery Model</label>

      <select
        name="model"
        value={value}
        onChange={onChange}
        disabled={!battery}
        className="input disabled:bg-gray-200"
      >
        <option value="">
          {battery ? `Select ${battery} Model` : "Select Battery First"}
        </option>

        {models.map(model => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}
