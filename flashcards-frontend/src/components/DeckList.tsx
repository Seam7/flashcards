import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDecks } from "../queries/getDecks";
import { deleteDeck } from "../queries/deleteDeck";
import { DeleteButton } from "./buttons/DeleteButton";

export const DeckList = () => {
  const queryClient = useQueryClient();
  const { data: decks } = useQuery({
    queryKey: ["decks"],
    queryFn: getAllDecks,
  });
  const { mutate: deleteDeckMutation } = useMutation({
    mutationFn: (id: number) => deleteDeck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });
  return (
    <div>
      {decks?.map((deck) => (
        <div key={deck.id}>
          <Link to={`/deck/${deck.id}`}>{deck.name}</Link>
          <DeleteButton
            onClick={() => {
              deleteDeckMutation(deck.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};
