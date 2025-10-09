import { createBrowserRouter } from "react-router";
import App from "../src/App";
import { Hello } from "../src/components/Hello";
import { Entry } from "../src/Entry";
import { CreateDeck } from "../src/components/CreateDeck";
import { SingleDeck } from "../src/components/SingleDeck";

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
        path: "hello",
        Component: Hello,
      },
      {
        path: "create-deck",
        Component: CreateDeck,
      },
      {
        path: "deck/:id",
        Component: SingleDeck,
      }
    ],
  },
]);