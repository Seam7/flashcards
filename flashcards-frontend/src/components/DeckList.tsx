import { useState } from "react";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDecks } from "../queries/getDecks";
import { deleteDeck } from "../queries/deleteDeck";
import { DeleteButton } from "./buttons/DeleteButton";
import { EditButton } from "./buttons/EditButton";
import type { Deck } from "../../types";
import { Button, TextField } from "@mui/material";
import { updateDeck } from "../queries/updateDeck";

export const DeckList = () => {
  const queryClient = useQueryClient();
  const { data: decks } = useQuery({
    queryKey: ["decks"],
    queryFn: getAllDecks,
  });
  const { mutate: updateDeckMutation } = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateDeck(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
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
          <DeckItem
            deck={deck}
            deleteDeckMutation={deleteDeckMutation}
            updateDeckMutation={updateDeckMutation}
          />
        </div>
      ))}
    </div>
  );
};

const DeckItem = ({
  deck,
  deleteDeckMutation,
  updateDeckMutation,
}: {
  deck: Deck;
  deleteDeckMutation: (id: number) => void;
  updateDeckMutation: ({ id, name }: { id: number; name: string }) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deckName, setDeckName] = useState(deck.name);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", margin: "10px 0" }}>
        {isEditing ? (
          <TextField
            label="Deck Name"
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
        ) : (
          <Link to={`/deck/${deck.id}`}>{deckName}</Link>
        )}
      </div>
      {isEditing && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            updateDeckMutation({ id: deck.id, name: deckName });
            setIsEditing(!isEditing);
          }}
        >
          Save
        </Button>
      )}
      {!isEditing && (
        <div style={{ display: "flex", gap: "10px" }}>
          <EditButton
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
          <DeleteButton
            onClick={() => {
              deleteDeckMutation(deck.id);
            }}
          />
        </div>
      )}
    </div>
  );
};
