import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleDeck } from "../queries/getDecks";
import { useUser } from "../hooks/useUser";
import { deleteCard } from "../queries/deleteCard";
import { DeleteButton } from "./buttons/DeleteButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Title } from "./layout/Title";

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
          <DeleteButton
            onClick={() => {
              deleteCardMutation(card.id);
            }}
          />
        </div>
      ))}
    </>
  );
};
