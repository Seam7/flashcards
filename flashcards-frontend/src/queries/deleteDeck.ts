export const deleteDeck = async (id: number) => {
  const response = await fetch(`http://localhost:3000/deck/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json() as Promise<{ message: string }>;
};