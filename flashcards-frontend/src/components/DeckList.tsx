import type { Deck } from "../../types";

export const DeckList = ({ decks }: { decks: Deck[] }) => {
  return (
    <div>
      {decks.map((deck) => (
        <div key={deck.id}>{deck.name}</div>
      ))}
    </div>
  );
};
