export const postCreateDeck = async (deckName: string, userId: number) => {
  const response = await fetch("http://localhost:3000/deck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: deckName, userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to create deck");
  }
  return response.json();
};