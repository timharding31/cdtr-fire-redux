// player chooses action
// audience allows, blocks, or challenges action
// if allowed:
  // wasAllowed = true
  // if exchange: dealCard(playerKey) twice
  // ACTION PROCEEDS

// if challenged:
  // determine challenge loser
  // if action proved:
    // player returns and receives a new card
    // challenger lost challenge choice
    // wasAllowed = true
    // if exchange: dealCard(playerKey) twice
    // ACTION PROCEEDS
  // if not proved:
    // player lost challenge choice
    // wasAllowed = false
    // ACTION DOES NOT PROCEED

// if blocked:
  // player allows or challenges block
  // if block challenged:
    // determine challenge loser
    // if block-challenge proved:
      // blocker returns proved card
      // player lost challenge choice
      // wasAllowed = false
      // ACTION DOES NOT PROCEED
    // if block-challenge challenge not proved:
      // blocker lost challenge choice
      // wasAllowed = true
      // ACTION PROCEEDS

// challenge outcome:
  // player loses chosen card (if challenger won challenge)
  // challenger loses chosen card & player reshuffles proved card (if challenger lost challenge)
  // blocker loses chosen card (if blocker lost challenge)
  // player loses chosen card & blocker reshuffles proved card (if blocker won challenge)

// action resolution (if wasAllowed === true):
  // part one: target kill choice (if didPlayerKill)
  // part two: exchange part two choice (if exchange)

// action outcome:
  // target loses kill choice, player steals, player receives coins, player returns exchanged influences

/* choice: {
  playerKey: '',
  targetKey: '',
  action: '',
  blockable: false,
  challengeable: false,
  paymentAmount: 0,
  receiptAmount: 0,
  wasActionAllowed: false,
  wasActionBlocked: false,
  wasActionChallenged: false,
  wasBlockAllowed: false,
  wasBlockChallenged: false
}

actionOutcome: {
  isComplete: false,
  exchangedCardKeys: [''],
  targetKillCardKey: '',
  didPlayerKill: false,
  didPlayerStealCoins: false,
  didPlayerExchange: false,
  didPlayerReceiveCoins: false,
}

if (wasActionAllowed && isComplete) {
  if (didPlayerKill) loseCard(targetKey, targetKillCardKey)
  if (didPlayerStealCoins) stealCoins(playerKey, targetKey)
  if (didPlayerExchange) exchangedCardKeys.forEach(cardKey => returnCard(playerKey, cardKey))
  if (didPlayerReceiveCoins) dealCoins(playerKey, receiptAmount)
}

challenge: {
  challengerKey: '',
  challengerWonChallenge: false,
  challengerLostCardKey: '',
  playerProvedCardKey: '',
  blockerKey: '',
  blockerWonChallenge: false,
  blockerLostCardKey: '',
  blockerProvedCardKey: '',
  playerLostCardKey: '',
}

if (wasActionChallenged || wasBlockChallenged) {
  if (!challengerWonChallenge) reshuffleCard(playerKey, playerProvedCardKey); loseCard(challengerKey, challengerLostCardKey)
  if (challengerWonChallenge) loseCard(playerKey, playerLostCardKey)
  if (!blockerWonChallenge) loseCard(blockerKey, blockerLostCardKey)
  if (blockerWonChallenge) reshuffleCard(blockerKey, blockerProvedCardKey); loseCard(playerKey, playerLostCardKey)
}
*/


/*
flow:
status = 'playerChoosingAction' DONE
  formSubmit  player chooses, player pays
status = 'opponentsRespondingToAction' DONE
  formSubmit  audience allows, challenges or blocks
status = 'playerChallenged', 'playerRespondingToBlock', 'playerReceivingExchange', 'targetChoosingKillCard', 'actionResolved' DONE
  loop        actionchallenge determination
status = 'playerChoosingLostChallengeCard' / 'challengerChoosingLostChallengeCard'
  loop        exchange part one if wasActionAllowed
status = 'playerChoosingExchange'
  formSubmit  player allows or challenges block
status = 'blockerChallenged' / 'blockerAllowed'
  loop        blockchallenge determination
status = 'playerChoosingLostChallengeCard' / 'blockerChoosingLostChallengeCard'
  formSubmit  challenge loser choices (proved card + challenge loser card)
status = 'challengeResolved'
  loop        challenge outcome
status = 'playerChoosingExchange' / 'targetChoosingKillCard' / 'actionResolved'
  formSubmit  action determination (exchange p2 choice or target kill choice)
status = 'actionResolved'
  loop        action outcome
status = 'turnComplete'
*/

const getChoiceOptions = (playerKey, targetKey='', playerChoice) => {
  let status = 'opponentsResponding';
  const action = playerChoice;
  let blockable = false;
  let challengeable = false;
  let paymentAmount = 0;
  let receiptAmount = 0;
  const numAllowers = 0;
  const numResponses = 0;
  let wasActionAllowed = false;
  const wasActionBlocked = false;
  const wasActionChallenged = false;
  const wasBlockAllowed = false;
  const wasBlockChallenged = false;
  let actionInfluences = [''];
  let blockInfluences = [''];

  switch (playerChoice) {
    case 'Assassinate':
      blockable = true;
      challengeable = true;
      paymentAmount = 3;
      actionInfluences = ['assassin'];
      blockInfluences = ['contessa'];
      break;
    case 'Coup':
      paymentAmount = 7;
      wasActionAllowed = true;
      status = 'targetChoosingKillCard';
      break;
    case 'Exchange':
      challengeable = true;
      actionInfluences = ['ambassador'];
      break;
    case 'Foreign Aid':
      blockable = true;
      receiptAmount = 2;
      blockInfluences = ['duke'];
      break;
    case 'Income':
      receiptAmount = 1;
      wasActionAllowed = true;
      status = 'actionResolved';
      break;
    case 'Steal':
      blockable = true;
      challengeable = true;
      actionInfluences = ['captain'];
      blockInfluences = ['captain', 'ambassador'];
      break;
    case 'Tax':
      challengeable = true;
      receiptAmount = 3;
      actionInfluences = ['duke'];
      break;
    default:
      break;
  }
  return {
    status,
    playerKey,
    targetKey,
    action,
    blockable,
    challengeable,
    paymentAmount,
    receiptAmount,
    numAllowers,
    numResponses,
    wasActionAllowed,
    wasActionBlocked,
    wasActionChallenged,
    wasBlockAllowed,
    wasBlockChallenged,
    actionInfluences,
    blockInfluences
  };
};

const getChallengeOutcomeOptions = () => ({
  challengerKey: '',
  challengerWonChallenge: true,
  challengerLostCardKey: '',
  playerProvedCardKey: '',
  blockerKey: '',
  blockerWonChallenge: false,
  blockerLostCardKey: '',
  blockerProvedCardKey: '',
  playerLostCardKey: '',
});

const getActionOutcomeOptions = () => ({
  isComplete: false,
  exchangedCardKeys: [''],
  targetKillCardKey: '',
  didPlayerKill: false,
  didPlayerStealCoins: false,
  didPlayerExchange: false,
  didPlayerReceiveCoins: false,
});

export const newBlankTurn = (playerKey, targetKey='', playerChoice) => {
  const choiceOptions = getChoiceOptions(playerKey, targetKey, playerChoice);
  const challengeOutcomeOptions = getChallengeOutcomeOptions();
  const actionOutcomeOptions = playerChoice === 'Income' ? { isComplete: true, didPlayerReceiveCoins: true, loaded: true } : getActionOutcomeOptions();
  if (playerChoice === 'Coup') actionOutcomeOptions.didPlayerKill = true;

  return {
    ...choiceOptions,
    ...challengeOutcomeOptions,
    ...actionOutcomeOptions
  };
};






























