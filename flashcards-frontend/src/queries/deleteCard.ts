export const deleteCard = async (id: number) => {
  const response = await fetch(`http://localhost:3000/card/${id}`, {
    method: "DELETE",
  });
  return response.json() as Promise<{ message: string }>;
};