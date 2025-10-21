import type { Deck, DeckWithCards } from "../../types";

export const getAllDecks = async () => {
  const response = await fetch("http://localhost:3000/decks", {
    credentials: "include",
  });
  return response.json() as Promise<Deck[]>;
};


export const getSingleDeck = async (id: number) => {
  const response = await fetch(`http://localhost:3000/deck/${id}`, {
    credentials: "include",
  });
  return response.json() as Promise<DeckWithCards>;
};