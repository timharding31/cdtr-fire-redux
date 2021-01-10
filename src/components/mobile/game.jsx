import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseConnect } from 'react-redux-firebase';
import { useGame, usePlayer, useTurn } from '../../util/hooks';
import GamePlay from './gameplay/';

const Game = () => {
  const { gamePIN } = useParams();
  useFirebaseConnect(`games/${gamePIN}`);
  const { wasGameFound, game } = useGame();
  const { wasPlayerFound } = usePlayer();

  if (wasGameFound && wasPlayerFound) {
    switch (game.status) {
        case 'In progress':
          return <GamePlay game={game} />
        case 'Waiting for players':
        default:
          return null;
      }
    } else {
        return <p>Loading</p>
    }
};

export default Game