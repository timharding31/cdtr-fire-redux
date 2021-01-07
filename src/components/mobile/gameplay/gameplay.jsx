import React, { useState, useEffect, useReducer } from 'react';
import { useGameFunctions, usePlayer, useTurn } from '../../../util/hooks/';
import PlayerCoins from './coins';
import PlayerCards from './cards';
import PlayerHeader from './header';
import './gameplay.css';

const initialCardState = { killedCardKey: '', challengeLossCardKey: '', exchangedCardKeys: [''] };
const cardReducer = (state, { type, key }) => {
  const oldState = { ...state };
  switch (type) {
    case 'select-kill':
      return Object.assign({}, state, { killedCardKey: key });
    case 'select-challenge':
      return Object.assign({}, state, { challengeLossCardKey: key });
    case 'select-exchange':
      let newExchangeList = oldState.exchangedCardKeys;
      newExchangeList.push(key);
      while (newExchangeList.length > 2) newExchangeList.shift();
      return Object.assign({}, state, { exchangeCardKeys: newExchangeList });
    default:
      return state;
  }
}

const GamePlay = ({ game, currentTurn }) => {
  const {
    playerKey,
    playerName,
    isCurrentPlayer,
    isCurrentTarget,
    isBlocker,
    isChallenger,
    playerCards,
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
  const selectCardForChallengeLoss = (key) => () => dispatch({ type: 'select-challenge', key });
  const selectCardForExchange = (key) => () => dispatch({ type: 'select-exchange', key });

  return (
    <div className="player-gameplay-root">
      <div className="player-gameplay-background">
        <PlayerHeader
          game={game}
          turnStatus={currentTurn.status}
          turn={currentTurn}
          isCurrentPlayer={isCurrentPlayer}
          isCurrentTarget={isCurrentTarget}
          isChallenger={isChallenger}
          isBlocker={isBlocker}
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
        />
        {/* <PlayerCards
          turnStatus={currentTurn ? currentTurn.status : 'playerChoosing'}
          isCurrentPlayer={isCurrentPlayer}
          isCurrentTarget={isCurrentTarget}
          isChallenger={isChallenger}
          liveCards={Object.entries(playerCards)}
          numCards={Object.keys(playerCards).length}
          selectCardForKill={selectCardForKill}
          selectCardForChallengeLoss={selectCardForChallengeLoss}
          selectCardForExchange={selectCardForExchange}
        /> */}
        <PlayerCoins coins={playerCoins} />
      </div>
    </div>
  )
};


export default GamePlay;