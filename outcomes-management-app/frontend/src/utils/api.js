// Utility functions to interact with the backend API
export const fetchOutcomes = async () => {
  const response = await fetch('/outcomes');
  return response.json();
};

export const fetchMeasurements = async () => {
  const response = await fetch('/measurements');
  return response.json();
};
