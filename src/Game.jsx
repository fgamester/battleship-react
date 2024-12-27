import CpuBoard from "./components/CpuBoard";
import PlayerBoard from "./components/PlayerBoard";
import '../src/styles/Game.css';

const Game = () => {
    return (
        <div id="game">
            <PlayerBoard />
            <CpuBoard />
        </div>
    )
}

export default Game;
