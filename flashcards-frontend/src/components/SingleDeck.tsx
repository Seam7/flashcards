import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleDeck } from "../queries/getDecks";
import { useUser } from "../hooks/useUser";
import { deleteCard } from "../queries/deleteCard";
import { Title } from "./layout/Title";
import { Button } from "@mui/material";
import { DeckCard } from "./DeckCard";

export const SingleDeck = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["deck", id],
    queryFn: () => getSingleDeck(Number(id)),
  });
  const { user } = useUser();
  const navigate = useNavigate();
  const { mutate: deleteCardMutation } = useMutation({
    mutationFn: (id: number) => deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deck", id] });
    },
  });
  return (
    <>
      <Title link="/" title={data?.name ?? ""} />
      <p>Cards: {data?.cards?.length}</p>
      <p>User: {user?.name}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate(`/deck/${id}/new`);
        }}
      >
        Add New Card
      </Button>
      {data?.cards?.map((card) => (
        <div key={card.id}>
          <DeckCard card={card} onDelete={deleteCardMutation} />
        </div>
      ))}
    </>
  );
};
