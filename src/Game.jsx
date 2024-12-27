import { useContext } from "react";
import { Context } from "./context/GameContext";
import CpuBoard from "./components/CpuBoard";
import PlayerBoard from "./components/PlayerBoard";
import Modal from "./components/Modal";
import '../src/styles/Game.css';

const Game = () => {
    const { gameActions, gameData } = useContext(Context);



    return (
        <div id="game">
            <PlayerBoard />
            <CpuBoard />
            {!gameData.playing && <Modal winner={gameData.winner} restart={gameActions.restart} />}
        </div>
    )
}

export default Game;
