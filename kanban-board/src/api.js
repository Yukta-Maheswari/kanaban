// api.js
const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export const fetchKanbanData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    throw new Error("API request failed: " + error.message);
  }
};
