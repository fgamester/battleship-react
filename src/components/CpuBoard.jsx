import { memo, useContext, useState, useEffect, useCallback, useRef } from 'react'
import Cell from './Cell'
import { Context } from '../context/GameContext';

const CpuBoard = ({ }) => {
    const [board, setBoard] = useState(Array(100).fill(false));
    const { gameData, cpuData, cpuActions, gameActions } = useContext(Context);
    const playing = useRef(gameData.playing);

    const cpuPlay = useCallback((remainSpots) => {
        if (playing.current) {
            const targetIndex = Math.floor(Math.random() * remainSpots.length);
            const targetPosition = remainSpots[targetIndex];
            setBoard(prev => {
                const newList = [...prev];
                newList[targetPosition] = true;
                return newList;
            });
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
            {board.map((item, index) => <Cell key={index} attacked={item} attack={setBoard} position={index} targets={gameData.remainTargets.player} playerTarget='player' cpuTurn={gameData.cpuTurn} playing={gameData.playing} />)}
        </div>
    )
}

export default memo(CpuBoard);