// In your frontend types.ts
export type { User, Deck, Flashcard } from "../flashcards-backend/src/generated/prisma";
import type { Prisma } from "../flashcards-backend/src/generated/prisma";

// This is the standard Prisma way to create types with relations
export type DeckWithCards = Prisma.DeckGetPayload<{
  include: { cards: true }
}>;