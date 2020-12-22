import { newBlankTurn } from '../../config/new_turn';

const getTurnsRef = (firebase, game) => {
  const db = firebase.database();
  const gameRef = db.ref(`games/${game.pin}`);
  const currentTurn = gameRef.child('turns/currentTurn');
  const turnRefs = {
    currentTurn,
    currentPlayer: gameRef.child('turns/currentPlayer'),
    action: currentTurn.child('action'),
    challenge: currentTurn.child('challenge'),
    previousTurns: gameRef.child('turns/previousTurns')
  };
  return turnRefs;
};

export const startTurn = (firebase, game) => (playerChoice, target='nobody') => {
  const { currentTurn } = getTurnsRef(firebase, game);
  let newTurn = newBlankTurn(playerChoice, target);
  currentTurn.update(newTurn);
};

export const endTurn = (firebase, game) => () => {
  const allPlayersList = Object.keys(game.users.players);
  const currentPlayerIdx = allPlayersList.indexOf(game.turns.currentPlayer);
  const nextPlayer = allPlayersList[(currentPlayerIdx + 1) % allPlayersList.length];
  const { currentTurn, previousTurns, action, challenge, currentPlayer } = getTurnsRef(firebase, game);
  const endedTurn = {};
  currentTurn.once('value', snapshot => {
    const endedTurnKey = previousTurns.push().key;
    endedTurn[endedTurnKey] = { ...snapshot.val(), player: game.turns.currentPlayer };
  });
  action.remove();
  challenge.remove();
  previousTurns.update(endedTurn);
  currentPlayer.set(nextPlayer);
};