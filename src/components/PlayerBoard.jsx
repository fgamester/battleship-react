import { memo, useContext, useEffect, useState, useRef } from 'react'
import Cell from './Cell'
import { Context } from '../context/GameContext';

const PlayerBoard = ({ }) => {
    const [board, setBoard] = useState(Array(100).fill(false));
    const { gameData, gameActions } = useContext(Context);
    const playing = useRef(gameData.playing);

    useEffect(() => {
        playing.current = gameData.playing;
    }, [gameData.playing]);

    useEffect(() => {
        if (gameData.remainTargets.cpu.length == 0) {
            gameActions.gameOver('Player');
        }
    }, [gameData.remainTargets.cpu]);

    return (
        <div id='game-board'>
            {board.map((item, index) => <Cell key={index} attacked={item} attack={setBoard} position={index} targets={gameData.remainTargets.cpu} playerTarget='cpu' cpuTurn={gameData.cpuTurn} playing={playing.current} />)}
        </div>
    )
}

export default memo(PlayerBoard);