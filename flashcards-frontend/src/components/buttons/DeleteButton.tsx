import TrashIcon from "/public/icons/delete.svg?react";

export const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} style={{ padding: "0px" }}>
      <TrashIcon style={{ width: "25px", height: "30px" }} />
    </button>
  );
};
