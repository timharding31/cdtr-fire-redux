import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dealHands, dealCoins } from '../../util/game_setup';
import { useFirebase } from 'react-redux-firebase';

const Game = () => {
    const firebase = useFirebase();
    const [game, setGame] = useState(false);
    const { gamePIN } = useParams();
    const allGames = useSelector(state => state.firebase.data.games);
    useEffect(() => {
        if (allGames) setGame(allGames[gamePIN])
    }, [allGames, gamePIN]);

    const startGame = (e) => {
        e.preventDefault();
        let players = Object.values(game.users.players);
        dealHands({ firebase, gamePIN, players});
        dealCoins({ firebase, gamePIN, players});
        firebase.database().ref('games/' + gamePIN + '/status').set('In progress');
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
            {(game.status === 'Waiting for players' && players) ? <button onClick={startGame}>Start Game</button> : null}
            </>
        )
    } else {
        return <p>Loading</p>
    }
};

export default Game