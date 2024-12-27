import { memo, useContext, useEffect, useCallback, useRef } from 'react'
import Cell from './Cell'
import { Context } from '../context/GameContext';

const CpuBoard = ({ }) => {
    const { gameData, cpuData, cpuActions, gameActions } = useContext(Context);
    const playing = useRef(gameData.playing);

    const cpuPlay = useCallback((remainSpots) => {
        if (playing.current) {
            // pendiente en mejorar la ia para utilizar los ultimos disparos efectivos e intentar disparar alrededor para terminar de hundir un barco
            const targetIndex = Math.floor(Math.random() * remainSpots.length);
            const targetPosition = remainSpots[targetIndex];
            gameActions.attack(targetPosition, 'cpu')
            cpuActions.confirmAttack(targetPosition);
        }
    }, [gameData.playing])

    useEffect(() => {
        playing.current = gameData.playing;
    }, [gameData.playing])

    useEffect(() => {
        if (gameData.cpuTurn) {
            const waitToPlay = setTimeout(() => cpuPlay(cpuData.remainSpots), 1000);
            return () => clearTimeout(waitToPlay);
        }
    }, [gameData.cpuTurn])

    useEffect(() => {
        if (gameData.remainTargets.player.length == 0) {
            gameActions.gameOver('CPU');
        }
    }, [gameData.remainTargets.player])

    return (
        <div id='game-board'>
            {gameData.board.cpu.map((item, index) => <Cell key={index} attacked={item} position={index} targets={gameData.remainTargets.player} playerTarget='player' player='cpu' cpuTurn={gameData.cpuTurn} />)}
        </div>
    )
}

export default memo(CpuBoard);