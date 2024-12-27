const Modal = ({ winner, restart }) => {
    return (
        <div id="modal">
            <h2>Game Over</h2>
            <h3>The Winner Is</h3>
            <h2>{winner}</h2>
            <button onClick={restart} id="restart-btn">Play Again</button>
        </div>
    )
}

export default Modal