import { Link } from "react-router";
import { DeckList } from "./components/DeckList";

export const Entry = () => {
  return (
    <div>
      <h1>Flash Cards App</h1>
      <p>Welcome to your flash cards application!</p>

      <Link to="/create-deck">
        <button>Create Deck</button>
      </Link>

      <DeckList />
    </div>
  );
};
