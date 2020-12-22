import { getGameRefs, getPlayerRefs, dealCard, dealCoins } from './_setup';


export const loseInfluence = (firebase, game) => (player, cardKey) => {
  const { playerLiveCards, playerDeadCards } = getPlayerRefs(firebase, game, player);
  const lostCardRef = playerLiveCards.child(cardKey);
  lostCardRef.once('value', snapshot => {
    const card = { [cardKey]: snapshot.val() };
    lostCardRef.remove();
    playerDeadCards.update(card);
  });
};

export const returnInfluence = (firebase, game, type='reshuffle') => (player, cardKey) => {
  const { courtDeck } = getGameRefs(firebase, game);
  const { playerLiveCards } = getPlayerRefs(firebase, game, player);
  const lostCardRef = playerLiveCards.child(cardKey);

  lostCardRef.once('value', snapshot => {
    const card = { [cardKey]: snapshot.val() };
    lostCardRef.remove();
    courtDeck.update(card);
  });

  if (type === 'reshuffle') dealCard(courtDeck, playerLiveCards);
};

export const payCoins = (firebase, game, paymentAmt) => (player) => {
  const { treasury } = getGameRefs(firebase, game);
  const { playerCoins } = getPlayerRefs(firebase, game, player);
  dealCoins(treasury, playerCoins, -paymentAmt);
};

export const receiveCoins = (firebase, game, receiptAmt) => (player) => {
  const { treasury } = getGameRefs(firebase, game);
  const { playerCoins } = getPlayerRefs(firebase, game, player);
  dealCoins(treasury, playerCoins, receiptAmt);
};

export const stealCoins = (firebase, game) => (player, target) => {
  const playerRefs = getPlayerRefs(firebase, game, player);
  const targetRefs = getPlayerRefs(firebase, game, target);

  targetRefs.playerCoins.once('value', snapshot => {
    const stealAmt = Math.min(2, snapshot.val());
    targetRefs.playerCoins.set(firebase.database.ServerValue.increment(-stealAmt));
    playerRefs.playerCoins.set(firebase.database.ServerValue.increment(stealAmt));
  });
};

export const exchangePartOne = (firebase, game) => (player) => {
  const { courtDeck } = getGameRefs(firebase, game);
  const { playerLiveCards } = getPlayerRefs(firebase, game, player);

  [1, 2].forEach(_ => {
    dealCard(courtDeck, playerLiveCards);
  });
};