import { createContext, useState } from "react";

export const Context = createContext(null);

export const GameContext = ({ children }) => {
    const [gameData, setGameData] = useState({
        board: {
            player: Array(100).fill(false),
            cpu: Array(100).fill(false)
        },
        remainTargets: {
            player: [43, 53, 63, 15, 16, 92, 93, 94, 95],
            cpu: [32, 33, 34, 20, 30, 40, 50, 81, 82]
        },
        cpuTurn: false,
        playing: true,
        winner: ''
    });
    const [gameActions] = useState({
        shipHit: (playerTarget, pointTarget) => {
            setGameData(prev => ({
                ...prev,
                remainTargets: {
                    ...prev.remainTargets,
                    [playerTarget]: prev.remainTargets[playerTarget].filter(item => item !== pointTarget)
                }
            }));
        },
        changeTurn: () => {
            setGameData(prev => ({
                ...prev,
                cpuTurn: !prev.cpuTurn
            }));
        },
        gameOver: (playerWinner) => {
            setGameData(prev => ({
                ...prev,
                playing: false,
                winner: playerWinner
            }));
        },
        restart: () => {
            setGameData(() => ({
                board: {
                    player: Array(100).fill(false),
                    cpu: Array(100).fill(false)
                },
                remainTargets: {
                    player: [43, 53, 63, 15, 16, 92, 93, 94, 95],
                    cpu: [32, 33, 34, 20, 30, 40, 50, 81, 82]
                },
                cpuTurn: false,
                playing: true,
                winner: ''
            }));
            cpuActions.resetMemory();
        },
        attack: (target, playerBoard) => {
            setGameData(prev => ({
                ...prev,
                board: {
                    ...prev.board,
                    [playerBoard]: [
                        ...prev.board[playerBoard].map((cell, index) => index === target ? true : cell)
                    ]
                }
            }));
        },
        placeShip: () => {
            // funcion pendiente para posicionar barcos de manera manual
        }
    });
    const [cpuData, setCpuData] = useState({
        // propiedad pensada para mejorar la ia(aún en progreso)
        targetRecord: [],
        remainSpots: Array.from({ length: 100 }, (_, index) => index)
    });
    const [cpuActions] = useState({
        confirmAttack: (target) => {
            setCpuData(prev => ({
                ...prev,
                targetRecord: [...prev.targetRecord, target],
                remainSpots: prev.remainSpots.filter(item => item != target)
            }));
            gameActions.changeTurn();
        },
        resetMemory: () => {
            setCpuData(() => ({
                targetRecord: [],
                remainSpots: Array.from({ length: 100 }, (_, index) => index)
            }));
        },
        placeShip: () => {
            //funcion pendiente para que la cpu posicione sus barcos de manera aleatoria
        }
    });

    return (
        <Context.Provider value={{ gameData, gameActions, cpuData, cpuActions }}>
            {children}
        </Context.Provider>
    )
}
