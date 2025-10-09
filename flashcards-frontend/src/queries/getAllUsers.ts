import type { User } from "../../types";

export const getAllUsers = async () => {
  const response = await fetch("http://localhost:3000/");
  return response.json() as Promise<User[]>;
};