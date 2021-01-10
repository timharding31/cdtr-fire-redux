import React, { useState, useEffect, useReducer } from 'react';
import { useGameFunctions, usePlayer, useTurn } from '../../../util/hooks/';
import PlayerCoins from './coins';
import PlayerCards from './cards';
import PlayerHeader from './header';
import './gameplay.css';

const initialCardState = { killedCardKey: '', challengeLossCardKey: '', exchangedCardKeys: [], ready: false };
const cardReducer = (state, { type, key }) => {
  const oldState = { ...state };
  let newExchangeList = oldState.exchangedCardKeys;
  switch (type) {
    case 'select-kill':
      return Object.assign({}, state, { killedCardKey: key, ready: true });
    case 'remove-kill':
      return initialCardState;
    case 'select-challenge':
      return Object.assign({}, state, { challengeLossCardKey: key, ready: true });
    case 'remove-challenge':
      return initialCardState;
    case 'select-exchange':
      if (!newExchangeList.includes(key)) newExchangeList.push(key);
      while (newExchangeList.length > 2) newExchangeList.shift();
      return Object.assign({}, state, { exchangedCardKeys: newExchangeList, ready: Boolean(newExchangeList.length >= 2) });
    case 'remove-exchange':
      newExchangeList = newExchangeList.filter(exchangeKey => exchangeKey !== key);
      return Object.assign({}, state, { exchangedCardKeys: newExchangeList, ready: false });
    default:
      return state;
  }
}

const GamePlay = ({ game }) => {
  const { currentTurn } = game.turns;
  const { loaded } = currentTurn;
  const {
    playerKey,
    playerName,
    isCurrentPlayer,
    isCurrentTarget,
    isBlocker,
    isChallenger,
    // playerCards,
    playerCoins,
  } = usePlayer();

  const [cardState, dispatch] = useReducer(cardReducer, initialCardState);

  const gameFunctions = useGameFunctions();

  const selectTurnAction = (playerChoice, targetKey) => gameFunctions.startTurn(playerKey, targetKey, playerChoice);
  const allowAction = gameFunctions.allowAction;
  const blockAction = () => gameFunctions.blockAction(playerKey);
  const challengeAction = () => gameFunctions.challengeAction(playerKey);
  const allowBlock = gameFunctions.allowBlock;
  const challengeBlock = gameFunctions.challengeBlock;
  const submitChallengeLossChoice = () => gameFunctions.submitChallengeLossChoice(playerKey, cardState.challengeLossCardKey);
  const submitKillChoice = () => gameFunctions.submitKillChoice(cardState.killedCardKey);
  const submitExchangeChoices = () => gameFunctions.submitExchangeChoices(cardState.exchangedCardKeys);

  const selectCardForKill = (key) => () => dispatch({ type: 'select-kill', key });
  const removeCardForKill = (key) => () => dispatch({ type: 'remove-kill', key });
  const selectCardForChallengeLoss = (key) => () => dispatch({ type: 'select-challenge', key });
  const removeCardForChallengeLoss = (key) => () => dispatch({ type: 'remove-challenge', key });
  const selectCardForExchange = (key) => () => dispatch({ type: 'select-exchange', key });
  const removeCardForExchange = (key) => () => dispatch({ type: 'remove-exchange', key });

  const isChooser = Boolean(
    (currentTurn.status === 'playerChoosingLostChallengeCard' && isCurrentPlayer)
    || (currentTurn.status === 'challengerChoosingLostChallengeCard' && isChallenger)
    || (currentTurn.status === 'blockerChoosingLostChallengeCard' && isBlocker)
    || (currentTurn.status === 'playerChoosingExchange' && isCurrentPlayer)
    || (currentTurn.status === 'targetChoosingKillCard' && isCurrentTarget)
  );

  let cardFunction, undoCardFunction, menuFunction;
  if (isChooser) {
    switch (currentTurn.status) {
      case 'playerChoosingExchange':
        cardFunction = selectCardForExchange;
        undoCardFunction = removeCardForExchange;
        menuFunction = submitExchangeChoices;
        break;
      case 'targetChoosingKillCard':
        cardFunction = selectCardForKill;
        undoCardFunction = removeCardForKill;
        menuFunction = submitKillChoice;
        break;
      default:
        cardFunction = selectCardForChallengeLoss;
        undoCardFunction = removeCardForChallengeLoss;
        menuFunction = submitChallengeLossChoice;
        break;
    }
  }

  return (
    <div className="player-gameplay-root">
      <div className="player-gameplay-background">
        <PlayerHeader
          turnLoaded={loaded}
          game={game}
          turnStatus={currentTurn.status}
          turn={currentTurn}
          isCurrentPlayer={isCurrentPlayer}
          isCurrentTarget={isCurrentTarget}
          isChallenger={isChallenger}
          isBlocker={isBlocker}
          isChooser={isChooser}
          playerName={playerName}
          playerKey={playerKey}
          selectTurnAction={selectTurnAction}
          allowAction={allowAction}
          blockAction={blockAction}
          challengeAction={challengeAction}
          challengeBlock={challengeBlock}
          allowBlock={allowBlock}
          submitChallengeLossChoice={submitChallengeLossChoice}
          submitKillChoice={submitKillChoice}
          submitExchangeChoices={submitExchangeChoices}
          cardState={cardState}
          playerCoins={playerCoins}
          isChoiceReady={cardState.ready}
          menuFunction={menuFunction}
        />
        <PlayerCards
          turnStatus={currentTurn ? currentTurn.status : 'playerChoosing'}
          isCurrentPlayer={isCurrentPlayer}
          isCurrentTarget={isCurrentTarget}
          isChallenger={isChallenger}
          isChooser={isChooser}
          cardFunction={cardFunction}
          undoCardFunction={undoCardFunction}
          cardState={cardState}
        />
        <PlayerCoins coins={playerCoins} />
      </div>
    </div>
  );
};


export default GamePlay;