import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGame, usePlayer } from '../../util/hooks';
import PlayerView from './player_view/player_view';

const Game = () => {
  const { wasGameFound, game } = useGame();
  const { wasPlayerFound, isCurrentPlayer, playerName, playerKey } = usePlayer();

  if (wasGameFound && wasPlayerFound) {
        return (
            <>
                <div>Game PIN is {game.pin}, username is {playerName}</div>
                <p>{isCurrentPlayer ? 'It is your turn' : 'It is NOT your turn'}</p>
                <PlayerView
                  game={game}
                  coins={game.hands.coins[playerName]}
                  playerName={playerName}
                  playerKey={playerKey}
                  isCurrentPlayer={isCurrentPlayer}
                  liveCards={game.hands.liveCards[playerName]}
                />
            </>
        )
    } else {
        return <p>Loading</p>
    }
};

export default Game