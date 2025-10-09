export const getAllDecks = async () => {
  const response = await fetch("http://localhost:3000/decks");
  return response.json();
};