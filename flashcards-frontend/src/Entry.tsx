import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./queries/getAllUsers";
import { Link } from "react-router";
import { useUser } from "./hooks/useUser";
import { useEffect } from "react";
import { DeckList } from "./components/DeckList";

export const Entry = () => {
  const { user } = useUser();
  // const { data: users } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: getAllUsers,
  // });

  // Temporary solution before auth is a thing. We use the dummy user for now.
  // useEffect(() => {
  //   console.log(users ? users[0] : "No data");
  //   if (users && users.length > 0) {
  //     setUser(users[0]);
  //   }
  // }, [users, setUser]);

  return (
    <div>
      <h1>Flash Cards App</h1>
      <p>Welcome to your flash cards application!</p>

      <Link to="/create-deck">
        <button>Create Deck</button>
      </Link>

      <DeckList />
    </div>
  );
};
