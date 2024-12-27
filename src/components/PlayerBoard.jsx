import { memo, useContext, useEffect } from 'react'
import Cell from './Cell'
import { Context } from '../context/GameContext';

const PlayerBoard = ({ }) => {
    const { gameData, gameActions } = useContext(Context);

    useEffect(() => {
        if (gameData.remainTargets.cpu.length == 0) {
            gameActions.gameOver('Player');
        }
    }, [gameData.remainTargets.cpu]);

    return (
        <div id='game-board'>
            {gameData.board.player.map((item, index) => <Cell key={index} attacked={item} attack={gameActions.attack} position={index} targets={gameData.remainTargets.cpu} playerTarget='cpu' player='player' cpuTurn={gameData.cpuTurn} playing={gameData.playing} />)}
        </div>
    )
}

export default memo(PlayerBoard);