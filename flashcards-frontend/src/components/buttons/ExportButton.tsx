import { useMutation } from "@tanstack/react-query";
import DownloadIcon from "/src/icons/download.svg?react";
import { Button, Tooltip } from "@mui/material";
import { exportDeck } from "../../queries/exportDeck";

export const ExportButton = ({
  deckId,
  deckName,
}: {
  deckId: number;
  deckName: string;
}) => {
  const { mutate: exportDeckMutation } = useMutation({
    mutationFn: (id: number) => exportDeck(id),
    onSuccess: (blob) => {
      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${deckName.replace(/[^a-z0-9]/gi, "_")}_flashcards.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
  });

  return (
    <Tooltip title="Export Deck">
      <Button
        onClick={() => exportDeckMutation(deckId)}
        style={{ padding: "0px", minWidth: "0px" }}
      >
        <DownloadIcon style={{ width: "25px", height: "30px" }} />
      </Button>
    </Tooltip>
  );
};
