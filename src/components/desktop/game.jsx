import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Game = () => {
    const [game, setGame] = useState(false);
    const { gamePIN } = useParams();
    const allGames = useSelector(state => state.firebase.data.games);
    useEffect(() => {
        if (allGames) setGame(allGames[gamePIN])
    }, [allGames, gamePIN]);

    if (game) {
        let players = Object.values(game.users.players);
        return (
            <>
            <div>Game PIN is {game.pin}</div>
            <p>Status: {game.status}</p>
            <ul>Players ({players.length}/6)
                {players.map((player,idx) => <li key={`player-${idx}`}>{player}</li>)}
            </ul>
            </>
        )
    } else {
        return <p>Loading</p>
    }
};

export default Game