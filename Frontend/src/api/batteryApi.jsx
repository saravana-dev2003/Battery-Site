import apiClient from "./apiClient";

export const createBattery = (data) =>
  apiClient.post("/batteries", data);

export const searchBatteries = (query) =>
  apiClient.get(`/batteries?q=${query}`);

export const updateBattery = (id, data) =>
  apiClient.put(`/batteries/${id}`, data);

export const deleteBattery = (id) =>
  apiClient.delete(`/batteries/${id}`);
