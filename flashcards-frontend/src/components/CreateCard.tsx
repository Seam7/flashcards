import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { postCreateCard } from "../queries/postCreateCard";

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
  return (
    <>
      <Link to={`/deck/${id}`}>Back</Link>
      <div>
        <h1>Create Card</h1>
        <p>Creating card for deck: {id}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          onClick={() => {
            createCard({ question, answer, deckId: Number(id) });
          }}
        >
          Create Card
        </button>
      </div>
    </>
  );
};
