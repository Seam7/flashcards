import { Link } from "react-router";
import { getAllDecks } from "../queries/getDecks";
import { useQuery } from "@tanstack/react-query";

export const DeckList = () => {
  const { data: decks } = useQuery({
    queryKey: ["decks"],
    queryFn: getAllDecks,
  });
  return (
    <div>
      {decks?.map((deck) => (
        <div key={deck.id}>
          <Link to={`/deck/${deck.id}`}>{deck.name}</Link>
          <button onClick={() => {}}>Delete</button>
        </div>
      ))}
    </div>
  );
};
