import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useGame, usePlayers } from '../../util/hooks';
import * as GameUtil from '../../util/game';
import Lobby from './lobby';
import GamePlay from './gameplay/';

const GameContainer = () => {
  const [game, isGameLoaded] = useGame();
  const [{ playerEntries, playerKeys, playerNames, numPlayers }, arePlayersJoined] = usePlayers(game);
  const firebase = useFirebase();
  const startGame = () => GameUtil.startGame(firebase, game);
  if (isGameLoaded) {
    switch (game.status) {
      case 'Waiting for players':
        return (
          <Lobby
            {...game}
            numPlayers={numPlayers}
            playerEntries={playerEntries}
            startGame={startGame}
            arePlayersJoined={arePlayersJoined}
          />
        )
      case 'In progress':
        return (
          <GamePlay />
        )
      default:
        return null
    }
  } else {
      return <p>Loading</p>
  }
};

export default GameContainer;