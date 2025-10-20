import type { Flashcard } from "../../types";

export type QuizState = {
  currentIndex: number;
  cardsStatus: CardStatus[];
  isComplete: boolean;
};

export type QuizAction =
  | { type: "ANSWER_CORRECT" }
  | { type: "ANSWER_INCORRECT" }
  | { type: "START_QUIZ"; cards: Flashcard[] };

export type CardStatus = {
  id: number;
  status: "correct" | "incorrect" | "pending" | "current";
};
