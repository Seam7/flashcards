import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postCreateDeck } from "../queries/postCreateDeck";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";
import { Title } from "./layout/Title";

export const CreateDeck = () => {
  const [deckName, setDeckName] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();
  const { mutate: createDeck } = useMutation({
    mutationFn: ({ deckName, userId }: { deckName: string; userId: number }) =>
      postCreateDeck(deckName, userId),
    onSuccess: () => {
      console.log("Deck created");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      console.log("Error creating deck");
    },
  });

  console.log({ user });
  if (!user) {
    return <div>No user found</div>;
  }

  const isInvalid = !deckName;

  return (
    <div>
      <Title link="/" title="Create Deck" />
      <p>Creating deck for: {user.name}</p>
      <TextField
        label="Deck Name"
        type="text"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={isInvalid}
        onClick={() => {
          createDeck({ deckName, userId: user.id });
        }}
      >
        Create Deck
      </Button>
    </div>
  );
};
