import type { CardStatus } from "./types";

interface CardPaginatorProps {
  cardsStatus: CardStatus[];
  currentIndex: number;
}

const CardPaginatorItem = ({ cardStatus }: { cardStatus: string }) => {
  console.log({ cardStatus });
  return <div className={`card-paginator-item ${cardStatus}`} />;
};

export const CardPaginator = ({
  cardsStatus,
  currentIndex,
}: CardPaginatorProps) => {
  return (
    <div className="card-paginator">
      {cardsStatus.map((cardStatus) => {
        console.log({ cardStatus, currentIndex });
        const status =
          cardStatus.id === currentIndex ? "current" : cardStatus.status;
        return <CardPaginatorItem key={cardStatus.id} cardStatus={status} />;
      })}
    </div>
  );
};
