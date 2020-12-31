import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { createGameState } from '../../config/initial_state';
import * as GameFunctions from '../game/';
import Game from '../../components/mobile/game';

export const useNewGame = () => {
  const firebase = useFirebase();
  const db = firebase.database();
  useFirebaseConnect('games/');
  const games = useSelector(state => state.firebase.data.games);
  let gamePIN = Math.floor(Math.random() * 8999 + 1000).toFixed();
  if (games) {
    while (gamePIN in games) {
      gamePIN = Math.floor(Math.random() * 8999 + 1000).toFixed();
    }
  }
  
  const newGameState = createGameState(gamePIN);
  const gameRef = db.ref(`games/${gamePIN}`);
  gameRef.set(newGameState, () => {
    const courtDeck = gameRef.child('court/courtDeck');
    ['ambassador', 'assassin', 'captain', 'contessa', 'duke'].forEach(character => {
      [1, 2, 3].forEach(_ => {
        const newCardKey = courtDeck.push().key;
        courtDeck.child(newCardKey).set(character);
      });
    });
  });
  return gamePIN;
};

export const useGame = () => {
  const { gamePIN } = useParams();
  useFirebaseConnect(`games/${gamePIN}`);
  const allGames = useSelector(state => state.firebase.data.games);

  if (!isLoaded(allGames) || isEmpty(allGames[gamePIN])) {
    return { wasGameFound: false, game: null };
  } else {
    return { wasGameFound: true, game: allGames[gamePIN] };
  }
};

export const usePlayers = () => {
  const { wasGameFound, game } = useGame();

  if (!wasGameFound || isEmpty(game.users) || isEmpty(game.users.players)) {
    return { werePlayersFound: false, players: null, numPlayers: 0 };
  } else {
    return { werePlayersFound: true, players: game.users.players, numPlayers: Object.keys(game.users.players).length };
  }
};

export const useCurrentPlayer = () => {
  const { wasGameFound, game } = useGame();
  const { werePlayersFound, players } = usePlayers();

  if (!wasGameFound || !werePlayersFound || isEmpty(game.turns) || isEmpty(game.turns.currentPlayer)) {
    return { wasCurrentPlayerFound: false, currentPlayerKey: null, currentPlayerName: null };
  } else {
    return { wasCurrentPlayerFound: true, currentPlayerKey: game.turns.currentPlayer, currentPlayerName: players[game.turns.currentPlayer] };
  }
};

export const useTurn = () => {
  const { wasGameFound, game } = useGame();
  const { wasCurrentPlayerFound } = useCurrentPlayer();

  if (!wasGameFound || game.status !== 'In progress' || !wasCurrentPlayerFound || !game.turns.currentTurn) {
    return { isTurnActive: false, turnAction: null, turnChallenge: null };
  } else {
    return {
      isTurnActive: true,
      turn: game.turns.currentTurn
    };
  }
};

export const useCurrentTarget = () => {
  const { isTurnActive, turn } = useTurn();

  if (!isTurnActive) {
    return 'nobody';
  } else {
    return turn.targetKey;
  }
};

export const usePlayer = () => {
  const { userKey } = useParams();
  const { werePlayersFound, players } = usePlayers();
  const { wasCurrentPlayerFound, currentPlayerKey } = useCurrentPlayer();
  const currentTarget = useCurrentTarget();

  if (!werePlayersFound) {
    return { wasPlayerFound: false, isCurrentPlayer: false, isCurrentTarget: false, playerName: null, playerKey: null };
  } else if (!wasCurrentPlayerFound) {
    return {
      wasPlayerFound: true,
      isCurrentPlayer: false,
      isCurrentTarget: false,
      playerName: players[userKey],
      playerKey: userKey
    };
  } else {
    return {
      wasPlayerFound: true,
      isCurrentPlayer: Boolean(currentPlayerKey === userKey),
      isCurrentTarget: Boolean(currentTarget === players[userKey]),
      playerName: players[userKey],
      playerKey: userKey
    };
  }
};

export const useGameFunctions = () => {
  const firebase = useFirebase();
  const { game, wasGameFound } = useGame();

  if (!wasGameFound) {
    return {};
  } else {
    return {
      startGame: GameFunctions.startGame(firebase, game),
      loseInfluence: GameFunctions.loseInfluence(firebase, game),
      returnReshuffledInfluence: GameFunctions.returnInfluence(firebase, game, 'reshuffle'),
      returnExchangedInfluence: GameFunctions.returnInfluence(firebase, game, 'exchange'),
      payForCoup: GameFunctions.payCoins(firebase, game, 7),
      payForAssassination: GameFunctions.payCoins(firebase, game, 3),
      receiveFromIncome: GameFunctions.receiveCoins(firebase, game, 1),
      receiveFromForeignAid: GameFunctions.receiveCoins(firebase, game, 2),
      receiveFromTax: GameFunctions.receiveCoins(firebase, game, 3),
      exchangePartOne: GameFunctions.exchangePartOne(firebase, game),
      stealCoins: GameFunctions.stealCoins(firebase, game),
      startTurn: GameFunctions.startTurn(firebase, game),
      switchTurns: GameFunctions.switchTurns(firebase,game),
      allowAction: GameFunctions.allowAction(firebase,game),
      challengeAction: GameFunctions.challengeAction(firebase,game),
      blockAction: GameFunctions.blockAction(firebase,game),
      challengeBlock: GameFunctions.challengeBlock(firebase,game),
      allowBlock: GameFunctions.allowBlock(firebase,game),
      submitChallengeLossChoice: GameFunctions.submitChallengeLossChoice(firebase,game),
      challengeOutcome: GameFunctions.challengeOutcome(firebase,game),
      submitKillChoice: GameFunctions.submitKillChoice(firebase,game),
      submitExchangeChoices: GameFunctions.submitExchangeChoices(firebase,game),
      actionOutcome: GameFunctions.actionOutcome(firebase,game),
    };
  }
};

// export const useTurnLoop = () => {
//   const { game } = useGame();
//   const { currentTurn, currentPlayer } = useSelector(state => state.firebase.data.games[game.pin].turns);

// };