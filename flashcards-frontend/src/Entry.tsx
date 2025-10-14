import { Link } from "react-router";
import { DeckList } from "./components/DeckList";
import { Button } from "@mui/material";

export const Entry = () => {
  return (
    <div>
      <h1>Flash Cards App</h1>
      <p>Welcome to your flash cards application!</p>

      <Link to="/create-deck">
        <Button variant="contained" color="primary">
          Create Deck
        </Button>
      </Link>

      <DeckList />
    </div>
  );
};
