import type { User } from "../../types";

export const getAllUsers = async () => {
  const response = await fetch("http://localhost:3000/");
  return response.json() as Promise<User[]>;
};

export const getUser = async (id: number) => {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  return response.json() as Promise<User>;
};