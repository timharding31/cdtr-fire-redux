import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import PlayerView from './player_view/player_view';

const Game = () => {
    const [player, setPlayer] = useState(false);
    const { gamePIN, userKey } = useParams();
    const game = useSelector(state => {
        const allGames = state.firebase.data.games
        if (allGames && gamePIN in allGames) return allGames[gamePIN];
    });

    useEffect(() => {
        if (game && userKey) setPlayer(game.users.allUsers[userKey]);
    }, [game, userKey, player]);

    if (game && player) {
        return (
            <>
                <div>Game PIN is {game.pin}, username is {player}</div>
                <PlayerView game={game} coins={game.hands.coins[player]} player={player} liveCards={game.hands.liveCards[player]} />
            </>
        )
    } else {
        return <p>Loading</p>
    }
};

export default Game