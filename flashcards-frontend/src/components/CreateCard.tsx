import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { postCreateCard } from "../queries/postCreateCard";

import { Title } from "./layout/Title";
import { Button, TextField } from "@mui/material";

export const CreateCard = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const { mutate: createCard } = useMutation({
    mutationFn: ({
      question,
      answer,
      deckId,
    }: {
      question: string;
      answer: string;
      deckId: number;
    }) => postCreateCard(question, answer, deckId),
    onSuccess: () => {
      console.log("Card created");
      navigate(`/deck/${id}`);
    },
    onError: (error) => {
      console.log(error);
      console.log("Error creating card");
    },
  });

  const isInvalid = !question || !answer;

  return (
    <>
      <Title link={`/deck/${id}`} title="Create Card" />
      <p>Creating card for deck: {id}</p>

      <div>
        <TextField
          label="Question"
          placeholder="Question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <TextField
          type="text"
          label="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            createCard({ question, answer, deckId: Number(id) });
          }}
          disabled={isInvalid}
        >
          Create Card
        </Button>
      </div>
    </>
  );
};
