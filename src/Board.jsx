import React, { useState } from 'react'
import Cell from './components/Cell'

const board = new Array(100).fill(null);

const Board = () => {
    const [remainPositions, setRemainPositions] = useState([31, 32, 33])

    return (
        <div id='game-board'>
            {board.map((_, index) => <Cell key={index} position={index + 1} targets={remainPositions} hit={setRemainPositions} />)}
        </div>
    )
}

export default Board