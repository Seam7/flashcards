import { useRef } from "react";
import DownloadIcon from "/src/icons/download.svg?react";
import { Button, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importDeck } from "../../queries/importDeck";

export const ImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: importDeckMutation, isPending } = useMutation({
    mutationFn: (file: File) => importDeck(file),
    onSuccess: () => {
      // Refresh decks after import
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
    onError: (err) => {
      console.error("Import failed:", err);
      alert("Failed to import deck");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onImport = (file: File) => {
      importDeckMutation(file);
    };

    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
    // allow selecting the same file again
    event.target.value = "";
  };

  return (
    <Tooltip title="Import Deck">
      <>
        <input
          type="file"
          accept=".json,.csv"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={isPending}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          style={{ padding: "0px", minWidth: "0px" }}
          disabled={isPending}
        >
          <DownloadIcon
            style={{
              width: "25px",
              height: "30px",
              transform: "rotate(180deg)",
            }}
          />
        </Button>
      </>
    </Tooltip>
  );
};
