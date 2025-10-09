### Screens
1. Root: Shows all decks available - Button to delete a deck
2. Clicking on a deck: Shows all cards on that deck, and a button to start quizing. This screen also has the ability to delete cards and update them, and rename the deck
3. Quiz: Using a deck of cards, randomize the deck and start showing the cards one by one. This screen should also show if a card was successfully guessed or not.
4. Update and create: Form to update or create cards. Could we reuse the same?


### Data Model
User - not really needed, but we'll keep it for now.
  - A user has many decks
Deck - Composed of many cards, only available to one user.
  - A deck has many cards and one user
Card - Only available to one deck and one user.
  - A card is in one deck

User model: {
  id
}

Deck model: {
  id
  user_id
}

Card model: {
  id
  deck_id
}