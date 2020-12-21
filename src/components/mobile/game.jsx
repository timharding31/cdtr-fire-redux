import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import { useGame, usePlayer } from '../../util/hooks';
import PlayerView from './player_view/player_view';

const Game = () => {
  const [game, isGameLoaded] = useGame();
  const [player, isPlayerLoaded] = usePlayer(game);
    // const [player, setPlayer] = useState(false);
    // const { gamePIN, userKey } = useParams();
    // useFirebaseConnect([`games/${gamePIN}`, gamePIN]);
    // const game = useSelector(state => {
    //     const allGames = state.firebase.data.games
    //     if (allGames && gamePIN in allGames) return allGames[gamePIN];
    // });

    // useEffect(() => {
    //     if (game && userKey) setPlayer(game.users.allUsers[userKey]);
    // }, [game, userKey, player]);

    if (isGameLoaded && isPlayerLoaded) {
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