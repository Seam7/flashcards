import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getSingleDeck } from "../queries/getDecks";
import type { Flashcard } from "../../types";
import { useState } from "react";

// !TODO: Shuffle the deck before starting the quiz
export const Quiz = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getSingleDeck(Number(id)),
  });
  console.log({ data });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#79CCBF",
        perspective: "1000px",
        margin: "-30px",
      }}
    >
      <QuizCard card={data?.cards[0] as Flashcard} />
    </div>
  );
};

const QuizCard = ({ card }: { card: Flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
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
          <h1>{card?.answer || "Answer"}</h1>
        </div>
      </div>
    </div>
  );
};
