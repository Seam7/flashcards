import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getSingleDeck } from "../queries/getDecks";
import type { Flashcard } from "../../types";
import { useEffect, useMemo, useReducer } from "react";
import { QuizCard } from "./Quiz/QuizCard";
import { CardPaginator } from "./Quiz/CardPaginator";
import { quizReducer } from "./Quiz/quizReducer";
import type { QuizState } from "./Quiz/types";
import "./Quiz.css";

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

  console.log({ complete: state.isComplete });

  const shuffledDeck = useMemo(() => {
    return [...(data?.cards ?? [])].sort(() => Math.random() - 0.5);
  }, [data?.cards]);

  useEffect(() => {
    if (shuffledDeck) {
      dispatch({ type: "START_QUIZ", cards: shuffledDeck });
    }
  }, [shuffledDeck]);

  return (
    <div className="quiz-container">
      <QuizCard
        card={shuffledDeck[state.currentIndex] as Flashcard}
        answer={dispatch}
      />
      <CardPaginator
        cardsStatus={state.cardsStatus}
        currentIndex={state.currentIndex}
      />
    </div>
  );
};
