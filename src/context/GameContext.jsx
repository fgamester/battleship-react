import { createContext, useState } from "react";

export const Context = createContext(null);

export const GameContext = ({ children }) => {
    const [gameData, setGameData] = useState({
        remainTargets: {
            player: [43, 53, 63],
            cpu: [31, 32, 33]
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
        }
    });
    const [cpuData, setCpuData] = useState({
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
        }
    });

    return (
        <Context.Provider value={{ gameData, gameActions, cpuData, cpuActions }}>
            {children}
        </Context.Provider>
    )
}
