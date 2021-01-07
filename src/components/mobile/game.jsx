import React from 'react';
import { useGame, usePlayer, useTurn } from '../../util/hooks';
import GamePlay from './gameplay/';

const Game = () => {
  const { wasGameFound, game } = useGame();
  const { wasPlayerFound } = usePlayer();
  const { currentTurn } = useTurn();

  if (wasGameFound && wasPlayerFound && currentTurn && game) {
    switch (game.status) {
        case 'In progress':
          return <GamePlay game={game} currentTurn={currentTurn} />
        case 'Waiting for players':
        default:
          return null;
      }
    } else {
        return <p>Loading</p>
    }
};

export default Game