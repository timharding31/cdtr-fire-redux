import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import PlayerView from './player_view/player_view';

const Game = () => {
    const [game, setGame] = useState(false);
    const [player, setPlayer] = useState(false);
    const { gamePIN, userKey } = useParams();
    const allGames = useSelector(state => state.firebase.data.games);
    useEffect(() => {
        if (allGames && !game) setGame(allGames[gamePIN]);
        
    }, [allGames, gamePIN, game]);
    useEffect(() => {
        if (game && userKey) setPlayer(game.users.allUsers[userKey]);
    }, [game, userKey, player]);

    if (game && player) {
        return (
            <>
                <div>Game PIN is {game.pin}, username is {player}</div>
                {game.status === 'In progress' ? <PlayerView game={game} coins={game.hands.coins[player]} player={player} liveCards={game.hands.liveCards[player]} /> : null}
            </>
        )
    } else {
        return <p>Loading</p>
    }
};

export default Game