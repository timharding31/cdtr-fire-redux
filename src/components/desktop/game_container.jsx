import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseConnect } from 'react-redux-firebase';
import { useGame, usePlayers, useGameFunctions, useCurrentPlayer, useTurn } from '../../util/hooks';
import * as GameUtil from '../../util/game';
import Lobby from './lobby';
import GamePlay from './gameplay/';

const GameContainer = () => {
  const { gamePIN } = useParams();
  useFirebaseConnect(`games/${gamePIN}`);
  const { wasGameFound, game } = useGame();
  const { werePlayersFound, players, numPlayers } = usePlayers();
  const { startGame } = useGameFunctions();
  const gameFunctions = useGameFunctions();
  Object.entries(gameFunctions).forEach(([fnName, fn]) => {
    window[fnName] = fn;
  });
  if (wasGameFound) {
    switch (game.status) {
      case 'Waiting for players':
        return (
          <>
            <Lobby
              {...game}
              numPlayers={numPlayers}
              playerEntries={players ? Object.entries(players) : []}
              startGame={startGame}
              werePlayersFound={werePlayersFound}
            />
          </>
        );
      case 'In progress':
        return (
          <>
            <GamePlay game={game} players={Object.values(players)} numPlayers={numPlayers} />
          </>
        )
      default:
        return null
    }
  } else {
      return <p>Loading</p>
  }
};

export default GameContainer;