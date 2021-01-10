import { getGameRefs, getPlayerRefs } from './_database';

export const dealCard = (deckRef, playerHandRef) => {
  deckRef.once('value', snapshot => {
    const deck = snapshot.val();
    const deckKeys = Object.keys(deck);
    const randomCardKey = deckKeys[Math.floor(Math.random() * deckKeys.length)];
    const randomCard = deck[randomCardKey];
    deckRef.child(randomCardKey).remove();
    playerHandRef.child(randomCardKey).set(randomCard);
    // playerHandRef.update({ [randomCardKey]: randomCard });
  });
};

export const dealCoins = (treasuryRef, playerCoinsRef, amt=1) => {
  treasuryRef.transaction(treasury => treasury - amt);
  playerCoinsRef.transaction(coins => coins + amt);
};

export const startGame = (firebase, game) => () => {
  const { courtDeck, treasury, status } = getGameRefs(firebase, game);
  const players = Object.keys(game.users.players);
  [1, 2].forEach(_ => {
    players.forEach(playerKey => {
      const { playerLiveCards, playerCoins } = getPlayerRefs(firebase, game, playerKey);
      dealCoins(treasury, playerCoins, 1);
      dealCard(courtDeck, playerLiveCards);
    });
  });
  status.set('In progress');
};