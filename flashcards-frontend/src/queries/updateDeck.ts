export const updateDeck = async (id: number, name: string) => {
  const response = await fetch(`http://localhost:3000/deck/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return response.json() as Promise<{ message: string }>;
};