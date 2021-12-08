import React from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Board/Board";
import "./App.css";
import { useState, useEffect } from "react";
import PregameModal from "./components/PregameModal/PregameModal";
import { RgbaColor } from "react-colorful";
import Store from "./store";
import ClearIcon from "@mui/icons-material/Clear";
import joinLobby from "./creators/joinLobby";
import { useCookies } from "react-cookie";
import socket from "./socket";
import { Player } from "./Models/Player";
interface BoardSettingsProps {
  boardColor: RgbaColor;
  boardSize: number[] | number;
}
interface LobbyProps {
  lobbyId: number;
  players: Player[];
}
function App() {
  const [sessionCookies, setSessionCookie, removeSessionCookie] = useCookies();
  socket.on("connect", () => {
    console.log("connected to server");
    socket.on("player-join-lobby", (receivedLobby) => {
      // if (receivedLobby.lobbyId === sessionCookies.session?.lobby?.lobbyId) {

      setSessionCookie("lobby", receivedLobby, { path: "/" });
      // }
    });
    socket.on("player-leave-lobby", (receivedLobby) => {
      setSessionCookie("lobby", receivedLobby, { path: "/" });
    });
    socket.on("player-ready", (receivedLobby) => {
      setSessionCookie("lobby", receivedLobby, { path: "/" });
    });
    socket.on("new-move", (data) => {});
  });
  // removeSessionCookie("command");
  // removeSessionCookie("lobby");
  const [pieceChoice, setPieceChoice] = useState<JSX.Element>(
    <ClearIcon sx={{ height: "40px", width: "40px" }} />
  );

  // const [boardColor, setBoardColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
  // const [boardSize, setBoardSize] = useState<number | number[]>(3);
  // const [boardSettings, setBoardSettings] = useState<BoardSettingsProps>({
  //   boardColor: { r: 50, g: 100, b: 150, a: 1 },
  //   boardSize: 3,
  // });
  // const [lobby, setLobby] = useState<LobbyProps>({
  //   lobbyId: 0,
  //   players: [{ name: "", piece: "" }],
  // });

  // Store(boardSettings, lobby);
  const handleSetSettings = (
    sizeValue: number | number[],
    colorValue: RgbaColor
  ) => {
    setSessionCookie(
      "board",
      { boardSettings: { boardColor: colorValue, boardSize: sizeValue } },
      { path: "/" }
    );
  };

  return (
    <>
      <Grid
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "blue",
          overflow: "auto",
        }}
      >
        <Grid container direction="column" justifyContent="center">
          <Grid item>
            <Board
              boardColor={sessionCookies?.board?.boardSettings?.boardColor}
              boardSize={sessionCookies?.board?.boardSettings?.boardSize}
              pieceChoice={pieceChoice}
            />
          </Grid>
          <PregameModal
            lobby={sessionCookies.lobby}
            sendBoardSettings={(size, color) => handleSetSettings(size, color)}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
