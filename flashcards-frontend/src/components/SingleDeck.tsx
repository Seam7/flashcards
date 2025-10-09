import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSingleDeck } from "../queries/getDecks";
import { useUser } from "../hooks/useUser";

export const SingleDeck = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["deck", id],
    queryFn: () => getSingleDeck(Number(id)),
  });
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <>
      <Link to="/">Back</Link>
      <h1>{data?.name}</h1>
      <p>Cards: {data?.cards?.length}</p>
      <p>User: {user?.name}</p>
      <button
        onClick={() => {
          navigate(`/deck/${id}/new`);
        }}
      >
        Add New Card
      </button>
      {data?.cards?.map((card) => (
        <div key={card.id}>
          {/* !TODO: Blur answer and add button to show it */}
          <span>{card.question}</span>-<span>{card.answer}</span>
        </div>
      ))}
    </>
  );
};
