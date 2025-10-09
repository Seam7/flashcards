import { useContext } from "react";
import { UserContext } from "../contexts/UserContextTypes";
import { getAllUsers } from "../queries/getAllUsers";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const context = useContext(UserContext);
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    enabled: !context?.user,
  });
  
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  
  const { user, setUser } = context;
  
  if (!user) {
    setUser(users?.[0] ?? null);
  }
  
  return context;
};