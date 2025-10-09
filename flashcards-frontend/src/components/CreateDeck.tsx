import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postCreateDeck } from "../queries/postCreateDeck";
import { useUser } from "../hooks/useUser";
import { Link, useNavigate } from "react-router";

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
      <Link to="/">Back</Link>
      <h1>Create Deck</h1>
      <p>Creating deck for: {user.name}</p>
      <input
        type="text"
        placeholder="Deck Name"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <button
        onClick={() => {
          createDeck({ deckName, userId: user.id });
        }}
      >
        Create Deck
      </button>
    </div>
  );
};
