import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo } from "react";
import determineWinner from "../../../creators/determineWinner";
import getGame from "../../../creators/getGame";
import createBoard from "../../../creators/createBoard";
import Icon from "@mui/material/Icon";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useCookies } from "react-cookie";
import { RgbaColor } from "react-colorful";
import { Player } from "../../../Models/Player";
import createPiece from "../../../storage/createPiece";

import { v4 as uuidv4 } from "uuid";
import { PlayerPieces } from "../../../Models/PlayerPieces";
import { Lobby } from "../../../Models/Lobby";
import { NewMove } from "../../../Models/NewMove";
import { GameStatus } from "../../../Models/GameStatus";
import { sizeOfPiece } from "../../../storage/sizeOfPiece";
import { WinningMove } from "../../../Models/Win";
interface BoardProps {
  newMove: NewMove;
  playerNumber: number;
  lobby: Lobby;

  setGameStatus: (status: GameStatus) => void;
  gameStatus: GameStatus;
}

export default function Board({
  newMove,
  playerNumber,
  lobby,
  setGameStatus,
  gameStatus,
}: BoardProps) {
  const [board, setBoard] = useState<number[][]>([[]]);
  const [cacheBoard, setCacheBoard] = useState<number[][]>([[]]);
  const [sessionCookies, setSessionCookies, removeSessionCookies] =
    useCookies();
  const [piece, setPiece] = useState<JSX.Element | string>();
  const [playerPieces, setPlayerPieces] = useState<PlayerPieces[]>([]);

  useEffect(() => {
    if (sessionCookies.command === "begin") {
      const getPlayerPieces = () => {
        let piecesValues: PlayerPieces[] = [];
        lobby?.players?.forEach((player: Player) => {
          if (
            player?.piece?.length > 30 &&
            player?.playerNumber === playerNumber
          ) {
            setPiece(
              <img
                src={player?.piece}
                alt={player?.piece}
                style={{
                  width: sizeOfPiece,
                  height: sizeOfPiece,
                  justifyContent: "center",
                  margin: "auto",
                  textAlign: "center",
                }}
              />
            );
          } else if (
            player?.piece?.length > 30 &&
            player?.playerNumber !== playerNumber
          ) {
            piecesValues.push({
              playerNumber: player?.playerNumber,
              piece: (
                <img
                  src={player?.piece}
                  alt={player?.piece}
                  style={{
                    width: sizeOfPiece,
                    height: sizeOfPiece,
                    justifyContent: "center",
                    margin: "auto",
                    textAlign: "center",
                  }}
                />
              ),
            });
          }
          createPiece(
            lobby?.board?.color?.r * 0.299 +
              lobby?.board?.color?.g * 0.587 +
              lobby?.board?.color?.b * 0.114 >
              186
              ? "black"
              : "white"
          ).forEach((piece) => {
            if (
              piece.name === player?.piece &&
              player?.playerNumber === playerNumber
            ) {
              setPiece(piece.value);
            } else if (piece.name === player?.piece) {
              piecesValues.push({
                playerNumber: player?.playerNumber,
                piece: piece.value,
              });
            }
          });
        });

        setPlayerPieces(piecesValues);
      };

      getPlayerPieces();
      createBoard(setBoard, lobby.board.size, lobby.board.moves);
    }
  }, [playerNumber, lobby]);

  useEffect(() => {
    if (newMove?.playerNumber !==undefined || newMove?.playerNumber !== 0) {
      board[newMove?.rowIdx][newMove?.tileIdx] = newMove?.playerNumber;
    }
  }, [newMove]);
  // const determineWinningMove = (rowIdx: number, tileIdx: number) => {
  //   let isWinningMove = false;
  //   gameStatus?.win?.winningMoves?.forEach((winningMove) => {
  //     if (winningMove.tileIdx === tileIdx && winningMove.rowIdx === rowIdx) {
  //       return (isWinningMove = true);
  //     } else {
  //       return (isWinningMove = false);
  //     }
  //   });
  //   return isWinningMove
  // };
  
  return (
    <>
      {board.map((row: number[], rowIdx: number) => (
        <Grid key={rowIdx} justifyContent="center" container>
          {row.map((tile: number, tileIdx: number) => (
            <>
              <TileHover
                move={{ rowIdx: rowIdx, tileIdx: tileIdx }}
                // isWinMove={gameStatus.win?.winningMoves?.map((winningMove) => {

                //   if(winningMove.rowIdx === rowIdx &&
                //     winningMove.tileIdx === tileIdx){
                //       return true
                //     }
                //   else{return false}

                // })}
               
                win={gameStatus.win}
                beforeColor={lobby?.board?.color}
                delay={(rowIdx * tileIdx === 0 ? 0 : rowIdx * tileIdx) * 10}
                boardRenderTime={200 * lobby?.board?.size}
              >
                <Tile
                  gameStatus={gameStatus}
                  playerNumber={playerNumber}
                  playerPieces={playerPieces}
                  updateBoardCache={() =>
                    gameStatus.whoTurn === playerNumber
                      ? determineWinner(
                          rowIdx,
                          tileIdx,
                          board,

                          lobby?.board?.size,
                          playerNumber,
                          lobby,
                          setGameStatus,
                          gameStatus,
                          setSessionCookies
                        )
                      : ""
                  }
                  value={tile}
                  newMove={newMove}
                  chosenPiece={piece}
                  boardColor={lobby?.board?.color}
                />
              </TileHover>
            </>
          ))}
        </Grid>
      ))}
    </>
  );
}
