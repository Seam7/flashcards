import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "30px",
          }}
        >
          <Outlet />
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
