export const postCreateCard = async (question: string, answer: string, deckId: number) => {
  const response = await fetch("http://localhost:3000/card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, answer, deckId }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to create card");
  }
  return response.json();
};