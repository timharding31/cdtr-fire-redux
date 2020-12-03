import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dealHands, dealCoins } from '../../util/game_setup';
import { startTurn, endTurn } from '../../util/game_play';
import { useFirebase } from 'react-redux-firebase';
import Button from '../resusable/button';

const Game = () => {
    const firebase = useFirebase();
    const [game, setGame] = useState(false);
    const { gamePIN } = useParams();
    const allGames = useSelector(state => state.firebase.data.games);
    useEffect(() => {
        if (allGames) setGame(allGames[gamePIN]);
    }, [allGames, gamePIN]);

    const startGame = (e) => {
        e.preventDefault();
        let players = Object.values(game.users.players);
        dealHands({ firebase, gamePIN, players});
        dealCoins({ firebase, gamePIN, players});
        firebase.database().ref('games/' + gamePIN + '/status').set('In progress');
    }

    const startTurnTest = e => {
      e.preventDefault()
      let playerKey = Object.keys(game.users.players)[0];
      let targetKey = Object.keys(game.users.players)[1];
      startTurn({ firebase, gamePIN, playerKey, targetKey, playerChoice: 'Income' });
    };

    const endTurnTest = e => {
      e.preventDefault();
      endTurn({ firebase, gamePIN });
    };

    if (game) {
        let players = Object.entries(game.users.players);
        return (
            <>
                <div>Game PIN is {game.pin}</div>
                <p>Status: {game.status}</p>
                <ul>Players ({players.length}/6)
                    {players.map(([key, player]) => <li key={`player-${key}`}>{player}</li>)}
                </ul>
                {(game.status === 'Waiting for players' && players) ? <Button color={'blue'} text={'Start Game'} fontSize={'18px'} onClick={startGame} /> : null}
              {(game.status === 'In progress' && players) ? <Button color={'red'} text={'Start Turn'} fontSize={'18px'} onClick={startTurnTest} /> : null}
              {(game.status === 'In progress' && players) ? <Button color={'green'} text={'End Turn'} fontSize={'18px'} onClick={endTurnTest} /> : null}
            </>
        )
    } else {
        return <p>Loading</p>
    }
};

export default Game