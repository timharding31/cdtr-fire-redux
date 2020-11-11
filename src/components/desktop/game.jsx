import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dealHands } from '../../util/game_setup';
import { useFirebase } from 'react-redux-firebase';

const Game = () => {
    const firebase = useFirebase();
    const [game, setGame] = useState(false);
    const { gamePIN } = useParams();
    const allGames = useSelector(state => state.firebase.data.games);
    useEffect(() => {
        if (allGames) setGame(allGames[gamePIN])
    }, [allGames, gamePIN]);

    const deal = (e) => {
        e.preventDefault();
        let players = Object.values(game.users.players);
        dealHands({ firebase, gamePIN, players});
    }

    if (game) {
        let players = Object.values(game.users.players);
        return (
            <>
            <div>Game PIN is {game.pin}</div>
            <p>Status: {game.status}</p>
            <ul>Players ({players.length}/6)
                {players.map((player,idx) => <li key={`player-${idx}`}>{player}</li>)}
            </ul>
            <button onClick={deal}>Deal</button>
            </>
        )
    } else {
        return <p>Loading</p>
    }
};

export default Game