import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useCookies } from "react-cookie";
const CopyLobbyId = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [sessionCookies, setSessionCookies] = useCookies();
  const handleCopyLobbyId = () => {
    navigator.clipboard.writeText(sessionCookies?.lobbyId);
    setIsCopied(true);
  };
  return (
    <Grid
      textAlign="right"
      justifyContent="right"
      container
      direction="row"
      spacing={2}
      item
    >
      <Grid item>
        <Button
          onClick={() => {
            handleCopyLobbyId();
          }}
        >
          {!isCopied ? "Copy ID to clipboard" : "Copied!"}
        </Button>
      </Grid>
      <Grid item>
        <Typography>Lobby ID: {sessionCookies?.lobbyId}</Typography>
      </Grid>
    </Grid>
  );
};
export default CopyLobbyId;