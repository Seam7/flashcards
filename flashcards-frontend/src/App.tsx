import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
