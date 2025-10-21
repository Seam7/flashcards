import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutQuery } from "../queries/logout";
import { useUser } from "./useUser";

export const useLogout = () => {
  const { setUser } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutQuery,
    onSuccess: () => {
      // Clear user from context
      setUser(null);
      // Clear all queries (optional, ensures clean state)
      queryClient.clear();
    },
  });
};

