import { useState, memo, useCallback } from 'react'

const Cell = memo(({ position, targets, hit }) => {
    const [attacked, setAttacked] = useState(false);
    const [targetAttacked, setTargetAttacked] = useState('')

    const fire = useCallback(() => {
        if (!attacked) {
            setAttacked(_ => true);
            if (targets.some(item => item == position)) {
                hit(prev => prev.filter(item => item != position));
                setTargetAttacked(() => 'ship-hit');
            } else {
                setTargetAttacked(() => 'missed');
            }
            console.log(position);
        }
    }, [attacked]);

    return (
        <div onClick={fire} className={`game-cell ${!attacked && 'water'} ${targetAttacked}`}>

        </div>
    )
});

export default Cell;