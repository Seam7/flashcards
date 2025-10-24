export const exportDeck = async (deckId: number): Promise<Blob> => {
  const response = await fetch(`http://localhost:3000/deck/${deckId}/export`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to export deck");
  }

  const blob = await response.blob();
  return blob;
}