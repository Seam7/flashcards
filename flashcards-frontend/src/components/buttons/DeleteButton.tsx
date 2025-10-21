import TrashIcon from "/src/icons/delete.svg?react";
import { Button, Tooltip } from "@mui/material";

export const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title="Delete">
      <Button onClick={onClick} style={{ padding: "0px", minWidth: "0px" }}>
        <TrashIcon style={{ width: "25px", height: "30px" }} />
      </Button>
    </Tooltip>
  );
};
