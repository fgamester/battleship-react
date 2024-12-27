import { useState, memo, useCallback, useContext, useEffect } from 'react'
import { Context } from '../context/GameContext';

const Cell = ({ position, targets, playerTarget, attacked, attack, cpuTurn, player, playing = false }) => {
    const [targetAttacked, setTargetAttacked] = useState('water')
    const { gameActions } = useContext(Context);

    const fire = useCallback(() => {
        if (!attacked) {
            gameActions.changeTurn();
            attack(position, player);
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
        } else {
            setTargetAttacked(() => 'water');
        }
    }, [attacked])

    return (
        <div {...(playing && !cpuTurn && playerTarget == 'cpu') && { onClick: fire }} className={`game-cell ${targetAttacked}`}>

        </div >
    )
}

export default memo(Cell);