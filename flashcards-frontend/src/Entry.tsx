import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./queries/getAllUsers";
import { Link } from "react-router";
import { useUser } from "./hooks/useUser";
import { useEffect } from "react";
import { getAllDecks } from "./queries/getAllDecks";
import { DeckList } from "./components/DeckList";

export const Entry = () => {
  const { setUser } = useUser();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { data: decks } = useQuery({
    queryKey: ["decks"],
    queryFn: getAllDecks,
  });

  // Temporary solution before auth is a thing. We use the dummy user for now.
  useEffect(() => {
    console.log(data ? data.data[0] : "No data");
    if (data && data.data.length > 0) {
      setUser(data.data[0]);
    }
  }, [data, setUser]);

  console.log({ decks });
  return (
    <div>
      <h1>Flash Cards App</h1>
      <p>Welcome to your flash cards application!</p>

      <Link to="/create-deck">
        <button>Create Deck</button>
      </Link>

      <DeckList decks={decks} />
    </div>
  );
};
