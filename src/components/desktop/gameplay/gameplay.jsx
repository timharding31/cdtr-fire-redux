import React, { useState, useEffect } from 'react';
import { actionOutcome, challengeOutcome } from '../../../util/game';
import { useGameFunctions, useTurn } from '../../../util/hooks';
import Button from '../../resusable/button';

const GamePlay = ({ game, players, numPlayers }) => {
  
  const gf = useGameFunctions();
  const { currentTurn } = useTurn();
  const [playerKey, setPlayerKey] = useState('');
  const [targetKey, setTargetKey] = useState('');
  const [cardKey, setCardKey] = useState('');
  const [challengerKey, setChallengerKey] = useState('');
  const [blockerKey, setBlockerKey] = useState('');
  const [playerChoice, setPlayerChoice] = useState('');
  const resetAll = () => {
    setPlayerKey('');
    setTargetKey('');
    setCardKey('');
    setChallengerKey('');
    setBlockerKey('');
    setPlayerChoice('');
  };
  useEffect(() => {
    if (currentTurn) {
      if (currentTurn.status === 'actionResolved') {
        gf.actionOutcome();
      } else if (currentTurn.status === 'challengeResolved') {
        gf.challengeOutcome();
      }
    }
  }, [currentTurn]);

  if (!game) return null;
  return (
    <>
      <p>Game: {game.pin}</p>
      <p>Current Player: {game.turns.currentPlayer}</p>
      <p>Turn Status: {game.turns.currentTurn.status}</p>
      <div>All Players: {Object.entries(game.users.players).map(([pKey, pName]) => {
        return (<div><h3>{`${pKey}: ${pName}`}</h3>{Object.entries(game.hands.liveCards[pKey]).map(([cKey,cName]) => <p>{`${cKey}: ${cName}`}</p>)}</div>)
      })}</div>
        {/* <input onChange={(e) => setPlayerKey(e.currentTarget.value)} value={playerKey} placeholder="playerKey" />
        <input onChange={(e) => setTargetKey(e.currentTarget.value)} value={targetKey} placeholder="targetKey" />
        <input onChange={(e) => setChallengerKey(e.currentTarget.value)} value={challengerKey} placeholder="challengerKey" />
        <input onChange={(e) => setBlockerKey(e.currentTarget.value)} value={blockerKey} placeholder="blockerKey" />
        <input onChange={(e) => setCardKey(e.currentTarget.value)} value={cardKey} placeholder="cardKey" />
        <input onChange={(e) => setPlayerChoice(e.currentTarget.value)} value={playerChoice} placeholder="playerChoice" />
        <br />
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.startTurn(playerKey, targetKey, playerChoice);
          resetAll();
        }}>StartTurn</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.allowAction();
          resetAll();
        }}>AllowAction</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.challengeAction(challengerKey);
          resetAll();
        }}>ChallengeAction</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.blockAction(blockerKey);
          resetAll();
        }}>BlockAction</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.challengeBlock();
          resetAll();
        }}>ChallengeBlock</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.allowBlock();
          resetAll();
        }}>AllowBlock</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.submitChallengeLossChoice(playerKey, cardKey);
          resetAll();
        }}>SubmitChallengeLossChoice</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.submitKillChoice(cardKey);
          resetAll();
        }}>SubmitKillChoice</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.challengeOutcome();
          resetAll();
        }}>ResolveChallenge</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          gf.actionOutcome();
          resetAll();
        }}>ResolveAction</button> */}
    </>
  );
};

export default GamePlay;