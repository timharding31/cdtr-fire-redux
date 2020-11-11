import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Game = () => {
    const [game, setGame] = useState('');
    const [player, setPlayer] = useState('');
    const { gamePIN, userKey } = useParams();
    const allGames = useSelector(state => state.firebase.data.games);
    useEffect(() => {
        if (allGames) setGame(allGames[gamePIN])
        if (game && userKey) setPlayer(game.users.allUsers[userKey])
    }, [allGames, gamePIN, game, userKey, player]);
    return (<div>Game PIN is {game.pin}, username is {player}</div>)
};

export default Game