import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContextTypes";
import { getCurrentUser } from "../queries/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  
  const { user, setUser } = context;
  
  // Fetch current authenticated user from the /me endpoint
  const { data: currentUser, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false, // Don't retry if not authenticated
    enabled: !user, // Only fetch if we don't have a user in context
  });
  
  // Update context when we get the user data
  useEffect(() => {
    if (currentUser && !user) {
      setUser(currentUser);
    }
  }, [currentUser, user, setUser]);
  
  // Clear user from context if auth fails
  useEffect(() => {
    if (isError && user) {
      setUser(null);
    }
  }, [isError, user, setUser]);
  
  return context;
};