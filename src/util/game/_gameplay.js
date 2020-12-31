import { getGameRefs, getPlayerRefs } from './_database';
import { dealCard, dealCoins } from './_setup';


export const loseInfluence = (firebase, game) => (playerKey, cardKey) => {
  const { playerLiveCards, playerDeadCards } = getPlayerRefs(firebase, game, playerKey);
  const lostCardRef = playerLiveCards.child(cardKey);
  lostCardRef.once('value', snapshot => {
    const card = { [cardKey]: snapshot.val() };
    lostCardRef.remove();
    playerDeadCards.update(card);
  });
};

export const returnInfluence = (firebase, game, type='reshuffle') => (playerKey, cardKey) => {
  const { courtDeck } = getGameRefs(firebase, game);
  const { playerLiveCards } = getPlayerRefs(firebase, game, playerKey);
  const lostCardRef = playerLiveCards.child(cardKey);

  lostCardRef.once('value', snapshot => {
    const card = { [cardKey]: snapshot.val() };
    lostCardRef.remove();
    courtDeck.update(card);
  });

  if (type === 'reshuffle') dealCard(courtDeck, playerLiveCards);
};

export const payCoins = (firebase, game, paymentAmt) => (playerKey) => {
  const { treasury } = getGameRefs(firebase, game);
  const { playerCoins } = getPlayerRefs(firebase, game, playerKey);
  dealCoins(treasury, playerCoins, -paymentAmt);
};

export const receiveCoins = (firebase, game, receiptAmt) => (playerKey) => {
  const { treasury } = getGameRefs(firebase, game);
  const { playerCoins } = getPlayerRefs(firebase, game, playerKey);
  dealCoins(treasury, playerCoins, receiptAmt);
};

export const stealCoins = (firebase, game) => (playerKey, targetKey) => {
  const playerRefs = getPlayerRefs(firebase, game, playerKey);
  const targetRefs = getPlayerRefs(firebase, game, targetKey);

  targetRefs.playerCoins.once('value', snapshot => {
    const stealAmt = Math.min(2, snapshot.val());
    targetRefs.playerCoins.set(firebase.database.ServerValue.increment(-stealAmt));
    playerRefs.playerCoins.set(firebase.database.ServerValue.increment(stealAmt));
  });
};

export const exchangePartOne = (firebase, game) => (playerKey) => {
  const { courtDeck } = getGameRefs(firebase, game);
  const { playerLiveCards } = getPlayerRefs(firebase, game, playerKey);

  [1, 2].forEach(_ => {
    dealCard(courtDeck, playerLiveCards);
  });
};