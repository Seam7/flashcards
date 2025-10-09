import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSingleDeck } from "../queries/getDecks";
import { useUser } from "../hooks/useUser";

export const SingleDeck = () => {
  const { id } = useParams();
  console.log({ id });
  const { data } = useQuery({
    queryKey: ["deck", id],
    queryFn: () => getSingleDeck(Number(id)),
  });
  const { user } = useUser();
  console.log({ data });
  console.log(user);
  return (
    <>
      <Link to="/">Back</Link>
      <h1>{data?.name}</h1>
      <p>Cards: {data?.cards?.length}</p>
      <p>User: {user?.name}</p>
    </>
  );
};
