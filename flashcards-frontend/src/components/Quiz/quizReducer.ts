import type { QuizState, QuizAction } from "./types";

export const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case "START_QUIZ":
      return {
        ...state,
        cardsStatus:
          action.cards?.map((_card, index) => ({
            id: index,
            status: "pending",
          })) ?? [],
        currentIndex: 0,
        isComplete: false,
      };
    case "ANSWER_CORRECT":
      return {
        ...state,
        cardsStatus: state.cardsStatus.map((card, index) =>
          index === state.currentIndex ? { ...card, status: "correct" } : card
        ),
        currentIndex: state.currentIndex + 1,
        isComplete: state.currentIndex + 1 >= state.cardsStatus.length,
      };
    case "ANSWER_INCORRECT":
      return {
        ...state,
        cardsStatus: state.cardsStatus.map((card, index) =>
          index === state.currentIndex ? { ...card, status: "incorrect" } : card
        ),
        currentIndex: state.currentIndex + 1,
        isComplete: state.currentIndex + 1 >= state.cardsStatus.length,
      };
  }
};
