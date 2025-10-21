import type { User } from "../../types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch("http://localhost:3000/me", {
    credentials: "include", // Include HTTP-only cookies
  });
  
  if (!response.ok) {
    throw new Error("Not authenticated");
  }
  
  return response.json();
};

