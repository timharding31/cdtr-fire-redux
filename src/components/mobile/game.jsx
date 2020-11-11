import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Game = () => {
    const [game, setGame] = useState({});
    const { gamePIN } = useParams();
    const allGames = useSelector(state => state.firebase.data.games);
    useEffect(() => {
        if (allGames) setGame(allGames[gamePIN])
    }, [allGames, gamePIN]);
    return (<div>Game PIN is {game.pin}</div>)
};

export default Game