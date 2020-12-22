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

export const dealCard = (deckRef, playerHandRef) => {
  deckRef.once('value', snapshot => {
    const deck = snapshot.val();
    const deckKeys = Object.keys(deck);
    const randomCardKey = deckKeys[Math.floor(Math.random() * deckKeys.length)];
    const randomCard = deck[randomCardKey];
    deckRef.child(randomCardKey).remove();
    playerHandRef.update({ [randomCardKey]: randomCard });
  });
};

export const dealCoins = (treasuryRef, playerCoinsRef, amt=1) => {
  treasuryRef.transaction(treasury => treasury - amt);
  playerCoinsRef.transaction(coins => coins + amt);
};

export const startGame = (firebase, game) => () => {
  const { courtDeck, treasury, status } = getGameRefs(firebase, game);
  const players = Object.values(game.users.players);
  [1, 2].forEach(_ => {
    players.forEach(player => {
      const { playerLiveCards, playerCoins } = getPlayerRefs(firebase, game, player);
      dealCoins(treasury, playerCoins, 1);
      dealCard(courtDeck, playerLiveCards);
    });
  });
  status.set('In progress');
};