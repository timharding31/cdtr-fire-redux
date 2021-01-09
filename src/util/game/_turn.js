import { newBlankTurn } from '../../config/new_turn';
import { payCoins, loseInfluence, returnInfluence, stealCoins, receiveCoins, exchangePartOne } from './_gameplay';
import { getTurnRefs } from './_database';

export const switchTurns = (firebase, game) => () => {
  const { users: { players }, turns: { currentPlayer } } = game;
  const allPlayersList = Object.keys(players);
  const currentPlayerIdx = allPlayersList.indexOf(currentPlayer);
  const nextPlayer = allPlayersList[(currentPlayerIdx + 1) % allPlayersList.length];
  const { currentTurnRef, previousTurnsRef, currentPlayerRef } = getTurnRefs(firebase, game);
  const updates = {};
  const endedTurnKey = previousTurnsRef.push().key;
  currentTurnRef.once('value', snapshot => {
    updates[endedTurnKey] = snapshot.val();
  });
  previousTurnsRef.update(updates);
  currentPlayerRef.set(nextPlayer);
  currentTurnRef.set({ status: 'playerChoosing' });
};

export const startTurn = (firebase, game) => (playerKey, targetKey='', playerChoice) => {
  const { currentTurnRef } = getTurnRefs(firebase, game);
  let newTurn = newBlankTurn(playerKey, targetKey, playerChoice);
  if (newTurn.paymentAmount > 0) payCoins(firebase, game, newTurn.paymentAmount)(playerKey);
  if (newTurn.challengeable) {
    let playerCards = game.hands.liveCards[playerKey];
    for (let cardKey in playerCards) {
      if (newTurn.actionInfluences.includes(playerCards[cardKey])) {
        newTurn.playerProvedCardKey = cardKey;
        newTurn.challengerWonChallenge = false;
      }
    }
  }
  currentTurnRef.update(newTurn);
};

export const allowAction = (firebase, game) => () => {
  const { users: { players }, turns: { currentPlayer, currentTurn: { action } } } = game;
  const numPlayers = Object.keys(players).length;

  const { currentTurnRef } = getTurnRefs(firebase, game);
  currentTurnRef.child('numAllowers').transaction(numAllowers => numAllowers + 1);
  currentTurnRef.child('numResponses').transaction(numResponses => numResponses + 1);
  currentTurnRef.once('value', snapshot => {
    const { numAllowers } = snapshot.val();
    if (numAllowers + 1 === numPlayers) {
      const updates = { wasActionAllowed: true, status: 'actionResolved' }
      switch (action) {
        case 'Exchange':
          exchangePartOne(firebase, game)(currentPlayer);
          updates.status = 'playerChoosingExchange';
          updates['didPlayerExchange'] = true;
          break;
        case 'Assassinate':
          updates['didPlayerKill'] = true;
          updates.status = 'targetChoosingKillCard';
          break;
        case 'Coup':
          updates.status = 'targetChoosingKillCard';
          updates['didPlayerKill'] = true;
          break;
        case 'Steal':
          updates['didPlayerStealCoins'] = true;
          break;
        case 'Foreign Aid':
          updates['didPlayerReceiveCoins'] = true;
          break;
        case 'Tax':
          updates['didPlayerReceiveCoins'] = true;
          break;
        default:
          break;
      }
      currentTurnRef.update(updates);
    }
  });
};

export const challengeAction = (firebase, game) => (challengerKey) => {
  const { hands: { liveCards }, turns: { currentTurn, currentPlayer } } = game;
  const currentPlayerCards = liveCards[currentPlayer];
  const { currentTurnRef } = getTurnRefs(firebase, game);
  const updates = {
    challengerKey,
    wasActionChallenged: true,
    challengerWonChallenge: true,
    status: 'playerChoosingLostChallengeCard',
    wasActionAllowed: false,
  };

  if (currentTurn.challengerKey === '') {
    for (let cardKey in currentPlayerCards) {
      if (currentTurn.actionInfluences.includes(currentPlayerCards[cardKey])) {
        updates['playerProvedCardKey'] = cardKey;
        updates.challengerWonChallenge = false;
        updates.status = 'challengerChoosingLostChallengeCard';
        updates.wasActionAllowed = true;
      }
    }
    currentTurnRef.update(updates);
  }
  currentTurnRef.child('numResponses').transaction(numResponses => numResponses + 1);
};

export const blockAction = (firebase, game) => (blockerKey) => {
  const { hands: { liveCards }, turns: { currentTurn } } = game;
  const blockerCards = liveCards[blockerKey];
  const { currentTurnRef } = getTurnRefs(firebase, game);
  const updates = {
    blockerKey,
    wasActionBlocked: true,
    status: 'playerRespondingToBlock',
  };

  if (!currentTurn.blockerKey) {
    for (let cardKey in blockerCards) {
      if (currentTurn.blockInfluences.includes(blockerCards[cardKey])) {
        updates['blockerProvedCardKey'] = cardKey;
        updates['blockerWonChallenge'] = true;
      }
    }
    currentTurnRef.update(updates);
  }
  currentTurnRef.child('numResponses').transaction(numResponses => numResponses + 1);
};

export const challengeBlock = (firebase, game) => () => {
  const { hands: { liveCards }, turns: { currentTurn: { blockerKey, blockInfluences } } } = game;
  const blockerCards = liveCards[blockerKey];
  const updates = {
    wasBlockChallenged: true,
    blockerWonChallenge: false,
    status: 'blockerChoosingLostChallengeCard',
    wasActionAllowed: true,
  };
  for (let cardKey in blockerCards) {
    if (blockInfluences.includes(blockerCards[cardKey])) {
      updates['blockerProvedCardKey'] = cardKey;
      updates.blockerWonChallenge = true;
      updates.wasActionAllowed = false;
      updates['didPlayerKill'] = false;
      updates['didPlayerReceiveCoins'] = false;
      updates['didPlayerStealCoins'] = false;
      updates.status = 'playerChoosingLostChallengeCard';
    }
  }
  const { currentTurnRef } = getTurnRefs(firebase, game);
  currentTurnRef.update(updates);
}

export const allowBlock = (firebase, game) => () => {
  const { currentTurnRef } = getTurnRefs(firebase, game);
  currentTurnRef.update({
    status: 'actionResolved',
    wasActionAllowed: false,
    wasActionBlocked: true,
    didPlayerKill: false,
    didPlayerStealCoins: false,
    didPlayerReceiveCoins: false
  });
};

export const submitChallengeLossChoice = (firebase, game) => (loserKey, cardKey) => {
  const { playerKey, blockerKey, challengerKey } = game.turns.currentTurn;
  const updates = { status: 'challengeResolved' };
  switch (loserKey) {
    case playerKey:
      updates['playerLostCardKey'] = cardKey;
      break;
    case blockerKey:
      updates['blockerLostCardKey'] = cardKey;
      break;
    case challengerKey:
      updates['challengerLostCardKey'] = cardKey;
      break;
    default:
      return;
  }
  const { currentTurnRef } = getTurnRefs(firebase, game);
  currentTurnRef.update(updates);
};

export const challengeOutcome = (firebase, game) => () => {
  const { currentTurn } = game.turns;

  const {
    status,
    action,
    playerKey,
    wasActionChallenged,
    wasBlockChallenged,
    challengerKey,
    challengerWonChallenge,
    challengerLostCardKey,
    playerProvedCardKey,
    blockerKey,
    blockerWonChallenge,
    blockerLostCardKey,
    blockerProvedCardKey,
    playerLostCardKey
  } = currentTurn;

  if (wasActionChallenged) {
    if (challengerWonChallenge && playerLostCardKey) {
      loseInfluence(firebase, game)(playerKey, playerLostCardKey);
    } else if (!challengerWonChallenge && playerProvedCardKey && challengerLostCardKey) {
      loseInfluence(firebase, game)(challengerKey, challengerLostCardKey);
      returnInfluence(firebase, game, 'reshuffle')(playerKey, playerProvedCardKey);
    }
  } else if (wasBlockChallenged) {
    if (blockerWonChallenge && blockerProvedCardKey && playerLostCardKey) {
      loseInfluence(firebase, game)(playerKey, playerLostCardKey);
      returnInfluence(firebase, game, 'reshuffle')(blockerKey, blockerProvedCardKey);
    } else if (!blockerWonChallenge && blockerLostCardKey) {
      loseInfluence(firebase, game)(blockerKey, blockerLostCardKey);
    }
  }
  const { currentTurnRef } = getTurnRefs(firebase, game);
  const updates = { wasActionAllowed: false, status: 'actionResolved' };
  if ((wasActionChallenged && !challengerWonChallenge) || (wasBlockChallenged && !blockerWonChallenge)) {
    updates.wasActionAllowed = true;
    switch (action) {
      case 'Exchange':
        exchangePartOne(firebase, game)(playerKey);
        updates['didPlayerExchange'] = true;
        updates.status = 'playerChoosingExchange';
        break;
      case 'Coup':
        updates['didPlayerKill'] = true;
        updates.status = 'targetChoosingKillCard';
        break;
      case 'Assassinate':
        updates['didPlayerKill'] = true;
        updates.status = 'targetChoosingKillCard';
        break;
      case 'Steal':
        updates['didPlayerStealCoins'] = true;
        break;
      case 'Foreign Aid':
        updates['didPlayerReceiveCoins'] = true;
        break;
      case 'Tax':
        updates['didPlayerReceiveCoins'] = true;
        break;
      default:
        break;
    }
  }
  currentTurnRef.update(updates);
};

export const submitKillChoice = (firebase, game) => (cardKey) => {
  const { currentTurnRef } = getTurnRefs(firebase, game);
  currentTurnRef.update({ targetKillCardKey: cardKey, status: 'actionResolved' });
};

export const submitExchangeChoices = (firebase, game) => (exchangedCardKeys) => {
  const { currentTurnRef } = getTurnRefs(firebase, game);
  currentTurnRef.update({ exchangedCardKeys, status: 'actionResolved' });
};

export const actionOutcome = (firebase, game) => () => {
  const { currentTurn } = game.turns;
  if (!currentTurn.status === 'actionResolved') return;

  const {
    playerKey,
    targetKey,
    wasActionAllowed,
    didPlayerKill,
    didPlayerStealCoins,
    didPlayerExchange,
    didPlayerReceiveCoins,
    targetKillCardKey,
    exchangedCardKeys,
    receiptAmount,
  } = currentTurn;

  if (wasActionAllowed) {
    if (didPlayerKill && targetKillCardKey) loseInfluence(firebase, game)(targetKey, targetKillCardKey);
    if (didPlayerStealCoins) stealCoins(firebase, game)(playerKey, targetKey);
    if (didPlayerExchange && exchangedCardKeys.length === 2) {
      exchangedCardKeys.forEach(cardKey => {
        returnInfluence(firebase, game, 'exchange')(playerKey, cardKey);
      });
    }
    if (didPlayerReceiveCoins) receiveCoins(firebase, game, receiptAmount)(playerKey);
  }
  const { currentTurnRef } = getTurnRefs(firebase, game);
  currentTurnRef.update({ isComplete: true, status: 'turnComplete' });
  switchTurns(firebase,game)();
};





// export const respondToAction = (firebase, game, type='allow') => (responderKey='') => {
//   switch (type) {
//     case 'allow':
//       allowAction(firebase, game)();
//       break;
//     case 'block-action':
//       blockAction(firebase, game)(responderKey);
//       break;
//     case 'challenge-action':
//       challengeAction(firebase, game)(responderKey);
//       break;
//     case 'allow-block':
//       allowBlock(firebase, game)();
//       break;
//     case 'challenge-block':
//       challengeBlock(firebase, game)();
//       break;
//     default:
//       return;
//   }
//   const { currentTurnRef } = getTurnRefs(firebase, game);
//   const { users: { players }, turns: { currentTurn: { action } } } = game;
//   const numPlayers = Object.keys(players).length;
//   let totalResponses;
//   let status = 'opponentsRespondingToAction';
//   currentTurnRef.once('value', snapshot => {
//     const { numResponses, wasActionAllowed, wasActionBlocked, wasActionChallenged } = snapshot.val();
//     totalResponses = numResponses;
//     if (wasActionChallenged) {
//       status = 'playerChallenged';
//     } else if (wasActionBlocked) {
//       status = 'playerRespondingToBlock';
//     } else if (wasActionAllowed) {
//       switch (action) {
//         case 'Exchange':
//           status = 'playerReceivingExchange';
//           break;
//         case 'Assassinate':
//           status = 'targetChoosingKillCard';
//           break;
//         case 'Coup':
//           status = 'targetChoosingKillCard';
//           break;
//         default:
//           status = 'actionResolved'
//           break;
//       }
//     }
//   });
//   if (totalResponses + 1 === numPlayers) {
//     currentTurnRef.update({ status: 'responsesReceived' });
//   }
// };