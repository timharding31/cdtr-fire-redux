import React, { useState } from 'react';
import Button from '../../resusable/button';
import './header.css';

const Dashboard = ({ playerName }) => {
  return <h1 className="player-header-information">{playerName}</h1>
};

const PlayerSelector = ({
  game,
  // turnStatus,
  // turn,
  // isCurrentPlayer,
  // isCurrentTarget,
  // isChallenger,
  // isBlocker,
  // playerName,
  // playerKey,
  selectTurnAction,
  // allowAction,
  // blockAction,
  // challengeAction,
  // challengeBlock,
  // allowBlock,
  // submitChallengeLossChoice,
  // submitKillChoice,
  // submitExchangeChoices,
  // cardState
}) => {

  const [playerChoice, setPlayerChoice] = useState('');
  const [targetKey, setTargetKey] = useState('');

  const renderActionOption = (actionName, idx) => (
    <Button onClick={() => setPlayerChoice(actionName)} text={actionName} color="red" />
  );

  const renderTargetOptions = ([key, name]) => (
    <Button onClick={() => setTargetKey(key)} text={name} key={key} color="blue" />
  );

  if (true) {
    return (
      <div>
        <ul>{['Income', 'Foreign Aid', 'Tax', 'Assassinate', 'Steal', 'Exchange', 'Coup'].map(renderActionOption)}</ul>
        {/* {Object.entries(game.users.players).map(renderTargetOptions)} */}
        <button onClick={() => selectTurnAction(playerChoice, targetKey)} type="_blank" color="purple">Submit</button>
      </div>
    );
  } else {
    return null;
  }
};

const TargetSelector = () => {

  return null
};

const ChallengerSelector = () => {

  return null
};

const BlockerSelector = () => {

  return null
};

const AudienceSelector = () => {

  return null
};

const PlayerHeader = (props) => {
  return (
    <div className="player-header">
      <Dashboard playerName={props.playerName} />
      {!props.isCurrentPlayer ? null : <PlayerSelector props={props} />}
      {!props.isCurrentTarget ? null : <TargetSelector props={props} />}
      {!props.isChallenger ? null : <ChallengerSelector props={props} />}
      {!props.isBlocker ? null : <BlockerSelector props={props} />}
      {(props.isCurrentPlayer || props.isCurrentTarget || props.isChallenger || props.isBlocker) ? null : <AudienceSelector props={props} />}
    </div>
  )
};

export default PlayerHeader;