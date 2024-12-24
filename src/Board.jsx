import React from 'react'
import Cell from './components/Cell'

const board = new Array(100).fill(null);

const Board = () => {
    return (
        <div id='game-board'>
            {board.map((_, index) => <Cell key={index} />)}
        </div>
    )
}

export default Board