import { useState, memo, useCallback, useContext, useEffect } from 'react'
import { Context } from '../context/GameContext';

const Cell = ({ position, targets, playerTarget, attacked, attack, cpuTurn, playing }) => {
    const [targetAttacked, setTargetAttacked] = useState('water')
    const { gameActions } = useContext(Context);

    const fire = useCallback(() => {
        if (!attacked) {
            gameActions.changeTurn();
            attack(prev => {
                const newList = [...prev];
                newList[position] = true;
                return newList;
            });
        }
    }, [attacked]);

    useEffect(() => {
        if (attacked) {
            if (targets.some(item => item == position)) {
                gameActions.shipHit(playerTarget, position)
                setTargetAttacked(() => 'ship-hit');
            } else {
                setTargetAttacked(() => 'missed');
            }
            console.log(`${position + 1}th position attacked in ${playerTarget} territory`);
        }
    }, [attacked])

    return (
        <div {...(playing && !cpuTurn && playerTarget == 'cpu') && { onClick: fire }} className={`game-cell ${targetAttacked}`}>

        </div >
    )
}

export default Cell;