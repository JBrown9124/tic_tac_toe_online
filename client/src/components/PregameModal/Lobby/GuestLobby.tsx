import PlayerList from "./PlayerList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import Button from "@mui/material/Button";
import PieceSelector from "./Settings/PieceSelector";
import { useCookies } from "react-cookie";
import playerReady from "../../../creators/playerReady";

interface GuestLobbyProps {
 
  handleLeave: () => void;
}
export default function GuestLobby({ handleLeave }: GuestLobbyProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const handleReady = async () => {
    const reqBody = {
      player: { name: sessionCookies?.name, piece: sessionCookies?.piece },
      lobbyId: sessionCookies?.lobby?.lobbyId,
    };
    playerReady(reqBody);
  };
  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography>Wait for host to start game...</Typography>
        </Grid>
        <Grid item>
          <PlayerList />
        </Grid>
        <Grid item>
          <PieceSelector />
        </Grid>
        <Grid item>
          {" "}
          <Button onClick={() => handleReady()}>Ready</Button>
        </Grid>
        <Grid item textAlign="center">
          <Button onClick={() => handleLeave()}>Leave</Button>
        </Grid>
      </Grid>
    </>
  );
}