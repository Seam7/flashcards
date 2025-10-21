import { Link } from "react-router";
import { DeckList } from "./components/DeckList";
import { Button } from "@mui/material";
import { useUser } from "./hooks/useUser";
import { LoginForm } from "./components/LoginForm";
import { LogoutButton } from "./components/buttons/LogoutButton";
import { CreateAccountForm } from "./components/CreateAccountForm";

export const Entry = () => {
  const context = useUser();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h1>Flash Cards App</h1>
        <LogoutButton />
      </div>
      <p>Welcome to your flash cards application!</p>

      {context?.user ? (
        <>
          <Link to="/create-deck">
            <Button variant="contained" color="primary">
              Create Deck
            </Button>
          </Link>

          <DeckList />
        </>
      ) : (
        <>
          <LoginForm />
          <p>Or</p>
          <CreateAccountForm />
        </>
      )}
    </div>
  );
};
