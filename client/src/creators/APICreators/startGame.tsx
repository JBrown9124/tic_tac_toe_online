import {socket} from "../../socket";
import axios from "axios";
import {Lobby} from "../../Models/Lobby";
import {GameStatus} from "../../Models/GameStatus";
import url from "../../storage/url"
interface BodyProps {
  board:{color:string, size:number|number[]}
  lobbyId:number
  piece:string
  
}
const saveStartGame = async (body: BodyProps) => {

  const { data } = await axios.post(`${url}/api/game`, 
    body,
  );
  return data;
};
const sendStartGame = (data: any) => {
  
  socket.emit("start-game", {lobbyId:data.lobby.lobbyId, hostSid:data?.lobby?.hostSid});
};
const startGame = async (body: BodyProps):Promise<{lobby:Lobby, gameStatus:GameStatus}|undefined> => {
  try {
    const data = await saveStartGame(body);
    const responseBody = {lobby:await data.lobby, gameStatus:await data.gameStatus}
    sendStartGame(responseBody);
 

    return responseBody;
  } catch (e) {
    console.log(e);
  }
};

export default startGame;
