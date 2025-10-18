import { useState } from "react";
import { DeleteButton } from "./buttons/DeleteButton";
import { type Flashcard } from "../../types";

export const DeckCard = ({
  card,
  onDelete,
}: {
  card: Flashcard;
  onDelete: (id: number) => void;
}) => {
  const [isBlurred, setIsBlurred] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "6px",
        alignItems: "center",
      }}
    >
      <span>{card.question}</span>-
      <div
        onClick={() => setIsBlurred(!isBlurred)}
        style={{
          filter: isBlurred ? "blur(4px)" : "none",
          transition: "filter 0.3s ease-in-out",
          cursor: "pointer",
        }}
      >
        {card.answer}
      </div>
      <DeleteButton
        onClick={() => {
          onDelete(card.id);
        }}
      />
    </div>
  );
};
