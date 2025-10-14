import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postCreateDeck } from "../queries/postCreateDeck";
import { useUser } from "../hooks/useUser";
import { Link, useNavigate } from "react-router";
import { Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
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

  return (
    <div>
      <Title link="/" title="Create Deck" />
      <p>Creating deck for: {user.name}</p>
      <input
        type="text"
        placeholder="Deck Name"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          createDeck({ deckName, userId: user.id });
        }}
      >
        Create Deck
      </Button>
    </div>
  );
};
