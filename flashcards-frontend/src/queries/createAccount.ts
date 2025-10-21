export const createAccount = async (name: string, email: string, password: string) => {
  const response = await fetch("http://localhost:3000/create-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies
    body: JSON.stringify({ name, email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create account");
  }
  
  return response.json();
};