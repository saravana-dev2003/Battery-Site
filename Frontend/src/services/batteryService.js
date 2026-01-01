const STORAGE_KEY = "batteryData";

export const saveBattery = (battery) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  existing.push(battery);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getBatteries = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};
