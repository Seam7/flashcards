import EditIcon from "/src/icons/edit.svg?react";
import { Button, Tooltip } from "@mui/material";

export const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title="Edit">
      <Button onClick={onClick} style={{ padding: "0px" }}>
        <EditIcon style={{ width: "25px", height: "30px" }} />
      </Button>
    </Tooltip>
  );
};
