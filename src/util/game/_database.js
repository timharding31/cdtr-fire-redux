export const getGameRefs = (firebase, game) => {
  const db = firebase.database();
  const gameRef = db.ref(`games/${game.pin}`);
  const refs = {
    gameRef,
    allUsers: gameRef.child('users'),
    allPlayers: gameRef.child('users/players'),
    allPlayerLiveCards: gameRef.child('hands/liveCards'),
    allPlayerDeadCards: gameRef.child('hands/deadCards'),
    allPlayerCoins: gameRef.child('hands/coins'),
    courtDeck: gameRef.child('court/courtDeck'),
    treasury: gameRef.child('court/treasury'),
    status: gameRef.child('status')
  };
  return refs;
};

export const getPlayerRefs = (firebase, game, player) => {
  const { allPlayerLiveCards, allPlayerDeadCards, allPlayerCoins } = getGameRefs(firebase, game);
  const playerRefs = {
    playerLiveCards: allPlayerLiveCards.child(player),
    playerDeadCards: allPlayerDeadCards.child(player),
    playerCoins: allPlayerCoins.child(player)
  };
  return playerRefs;
};

export const getTurnRefs = (firebase, game) => {
  const db = firebase.database();
  const gameRef = db.ref(`games/${game.pin}`);
  const turnsRef = gameRef.child('turns/');
  const turnRefs = {
    turnsRef,
    currentTurnRef: turnsRef.child('currentTurn'),
    currentPlayerRef: turnsRef.child('currentPlayer'),
    previousTurnsRef: turnsRef.child('previousTurns')
  };
  return turnRefs;
};

export const readRef = (ref) => {
  let snapshotVal;
  ref.once('value', snapshot => {
    snapshotVal = snapshot.val();
  });
  return snapshotVal;
}