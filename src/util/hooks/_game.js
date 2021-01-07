import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { createGameState } from '../../config/initial_state';
import * as GameFunctions from '../game/';
import Game from '../../components/mobile/game';
import { useEffect, useState } from 'react';

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
    return {
      werePlayersFound: false,
      players: null,
      numPlayers: 0
    };
  } else {
    return {
      werePlayersFound: true,
      players: game.users.players,
      numPlayers: Object.keys(game.users.players).length
    };
  }
};

export const useTurn = () => {
  const { wasGameFound, game } = useGame();
  const [currentPlayer, setCurrentPlayer] = useState();
  const [currentTurn, setCurrentTurn] = useState();
  useEffect(() => {
    if (wasGameFound && game.status === 'In progress') {
      setCurrentPlayer(game.turns.currentPlayer);
      setCurrentTurn(game.turns.currentTurn);
    }
  }, [wasGameFound, game]);

  return { currentPlayer, currentTurn };
};

export const usePlayer = () => {
  const { userKey } = useParams();
  const { wasGameFound, game } = useGame();
  const { currentPlayer, currentTurn } = useTurn();

  const [wasPlayerFound, setWasPlayerFound] = useState(false);
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
  const [isCurrentTarget, setIsCurrentTarget] = useState(false);
  const [isBlocker, setIsBlocker] = useState(false);
  const [isChallenger, setIsChallenger] = useState(false);
  const [playerCards, setCards] = useState({});
  const [playerCoins, setCoins] = useState(0);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    if (!currentTurn || !wasGameFound || !currentPlayer) return;
    
    const { targetKey, blockerKey, challengerKey } = currentTurn;
    const { users: { players }, hands: { liveCards, coins } } = game;

    setWasPlayerFound(Boolean(userKey in players));
    setPlayerName(players[userKey]);
    setCards(liveCards[userKey]);
    setCoins(coins[userKey]);
    setIsCurrentPlayer(Boolean(currentPlayer === userKey));
    setIsCurrentTarget(Boolean(targetKey === userKey));
    setIsBlocker(Boolean(blockerKey === userKey));
    setIsChallenger(Boolean(challengerKey === userKey));
  }, [wasGameFound, currentTurn, currentPlayer, game]);

  return {
    wasPlayerFound,
    playerKey: userKey,
    playerName,
    playerCards,
    playerCoins,
    isCurrentPlayer,
    isCurrentTarget,
    isBlocker,
    isChallenger
  };
};

export const useGameFunctions = () => {
  const firebase = useFirebase();
  const { game, wasGameFound } = useGame();
  const [functions, setFunctions] = useState({
    startGame: () => null,
    loseInfluence: () => null,
    returnReshuffledInfluence: () => null,
    returnExchangedInfluence: () => null,
    payForCoup: () => null,
    payForAssassination: () => null,
    receiveFromIncome: () => null,
    receiveFromForeignAid: () => null,
    receiveFromTax: () => null,
    exchangePartOne: () => null,
    stealCoins: () => null,
    startTurn: () => null,
    switchTurns: () => null,
    allowAction: () => null,
    challengeAction: () => null,
    blockAction: () => null,
    challengeBlock: () => null,
    allowBlock: () => null,
    submitChallengeLossChoice: () => null,
    challengeOutcome: () => null,
    submitKillChoice: () => null,
    submitExchangeChoices: () => null,
    actionOutcome: () => null,
  });

  useEffect(() => {
    if (!wasGameFound) {
      return;
    } else {
      setFunctions({
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
        switchTurns: GameFunctions.switchTurns(firebase, game),
        allowAction: GameFunctions.allowAction(firebase, game),
        challengeAction: GameFunctions.challengeAction(firebase, game),
        blockAction: GameFunctions.blockAction(firebase, game),
        challengeBlock: GameFunctions.challengeBlock(firebase, game),
        allowBlock: GameFunctions.allowBlock(firebase, game),
        submitChallengeLossChoice: GameFunctions.submitChallengeLossChoice(firebase, game),
        challengeOutcome: GameFunctions.challengeOutcome(firebase, game),
        submitKillChoice: GameFunctions.submitKillChoice(firebase, game),
        submitExchangeChoices: GameFunctions.submitExchangeChoices(firebase, game),
        actionOutcome: GameFunctions.actionOutcome(firebase, game),
      });
    }

  }, [firebase, game, wasGameFound]);

  return functions;

  // if (!wasGameFound) {
  //   return {};
  // } else {
  //   return {
  //     startGame: GameFunctions.startGame(firebase, game),
  //     loseInfluence: GameFunctions.loseInfluence(firebase, game),
  //     returnReshuffledInfluence: GameFunctions.returnInfluence(firebase, game, 'reshuffle'),
  //     returnExchangedInfluence: GameFunctions.returnInfluence(firebase, game, 'exchange'),
  //     payForCoup: GameFunctions.payCoins(firebase, game, 7),
  //     payForAssassination: GameFunctions.payCoins(firebase, game, 3),
  //     receiveFromIncome: GameFunctions.receiveCoins(firebase, game, 1),
  //     receiveFromForeignAid: GameFunctions.receiveCoins(firebase, game, 2),
  //     receiveFromTax: GameFunctions.receiveCoins(firebase, game, 3),
  //     exchangePartOne: GameFunctions.exchangePartOne(firebase, game),
  //     stealCoins: GameFunctions.stealCoins(firebase, game),
  //     startTurn: GameFunctions.startTurn(firebase, game),
  //     switchTurns: GameFunctions.switchTurns(firebase,game),
  //     allowAction: GameFunctions.allowAction(firebase,game),
  //     challengeAction: GameFunctions.challengeAction(firebase,game),
  //     blockAction: GameFunctions.blockAction(firebase,game),
  //     challengeBlock: GameFunctions.challengeBlock(firebase,game),
  //     allowBlock: GameFunctions.allowBlock(firebase,game),
  //     submitChallengeLossChoice: GameFunctions.submitChallengeLossChoice(firebase,game),
  //     challengeOutcome: GameFunctions.challengeOutcome(firebase,game),
  //     submitKillChoice: GameFunctions.submitKillChoice(firebase,game),
  //     submitExchangeChoices: GameFunctions.submitExchangeChoices(firebase,game),
  //     actionOutcome: GameFunctions.actionOutcome(firebase,game),
  //   };
  // }
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

export const useCurrentTarget = () => {
  const { isTurnActive, turn } = useTurn();

  if (!isTurnActive) {
    return 'nobody';
  } else {
    return turn.targetKey;
  }
};

// export const useTurnLoop = () => {
//   const { game } = useGame();
//   const { currentTurn, currentPlayer } = useSelector(state => state.firebase.data.games[game.pin].turns);

// };