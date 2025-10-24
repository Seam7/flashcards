import { useState } from "react";
import { Button } from "@mui/material";
import type { Flashcard } from "../../../types";
import type { QuizAction } from "./types";

interface QuizCardProps {
  card: Flashcard;
  answer: (action: QuizAction) => void;
}

export const QuizCard = ({ card, answer }: QuizCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handler for answer buttons with delay
  const handleAnswer = (action: QuizAction) => {
    setIsAnswering(true);
    setTimeout(() => {
      answer(action);
      setIsAnswering(false);
    }, 150);
  };

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
      <div className="card-front">
        <div className="card-front-content">
          <h1>{card?.question || "Question"}</h1>
        </div>
      </div>
      <div className="card-back">
        <div className="card-back-content">
          <div />
          <h1 className="quiz-answer">{card?.answer || "Answer"}</h1>
          <div className="quiz-button-container">
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAnswer({ type: "ANSWER_CORRECT" })}
              className="quiz-button"
              disabled={isAnswering}
            >
              Correct
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleAnswer({ type: "ANSWER_INCORRECT" })}
              className="quiz-button"
              disabled={isAnswering}
            >
              Incorrect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
