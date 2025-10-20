import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getSingleDeck } from "../queries/getDecks";
import type { Flashcard } from "../../types";
import { useEffect, useReducer, useState } from "react";
import { QuizCard } from "./Quiz/QuizCard";
import { CardPaginator } from "./Quiz/CardPaginator";
import { quizReducer } from "./Quiz/quizReducer";
import type { QuizState } from "./Quiz/types";
import "./Quiz.css";
import { Confetti } from "./Confetti";
import { Button } from "@mui/material";

export const Quiz = () => {
  const initialState: QuizState = {
    currentIndex: 0,
    cardsStatus: [],
    isComplete: false,
  };
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getSingleDeck(Number(id)),
  });
  const navigate = useNavigate();

  console.log({ complete: state.isComplete });

  const [shuffledDeck, setShuffledDeck] = useState<Flashcard[]>([]);

  useEffect(() => {
    if (data?.cards && shuffledDeck.length === 0) {
      const shuffled = [...data.cards].sort(() => Math.random() - 0.5);
      setShuffledDeck(shuffled);
      dispatch({ type: "START_QUIZ", cards: shuffled });
    }
  }, [data?.cards, shuffledDeck.length]);

  const handleTryAgain = () => {
    if (data?.cards) {
      const newShuffled = [...data.cards].sort(() => Math.random() - 0.5);
      setShuffledDeck(newShuffled);
      dispatch({ type: "START_QUIZ", cards: newShuffled });
    }
  };

  return (
    <div className="quiz-container">
      {state.isComplete ? (
        <>
          <Confetti />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/deck/${id}`);
            }}
          >
            Go back
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleTryAgain}
          >
            Try again
          </Button>
        </>
      ) : (
        <>
          <QuizCard
            card={shuffledDeck[state.currentIndex] as Flashcard}
            answer={dispatch}
          />
          <CardPaginator
            cardsStatus={state.cardsStatus}
            currentIndex={state.currentIndex}
          />
        </>
      )}
    </div>
  );
};
