import { createBrowserRouter } from "react-router";
import App from "../src/App";
import { Entry } from "../src/Entry";
import { CreateDeck } from "../src/components/CreateDeck";
import { SingleDeck } from "../src/components/SingleDeck";
import { CreateCard } from "../src/components/CreateCard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Entry,
      },
      {
        path: "create-deck",
        Component: CreateDeck,
      },
      {
        path: "deck/:id",
        Component: SingleDeck,
      },
      {
        path: "deck/:id/new",
        Component: CreateCard,
      }
    ],
  },
]);