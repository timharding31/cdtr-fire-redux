import React from 'react';
import './header.css';

const Dashboard = ({ playerName }) => {
  return <h1 className="player-header-information">{playerName}</h1>
};

const TurnSelector = () => {


  return null
};

const TargetSelector = () => {

  return null
};

const PlayerHeader = ({ isCurrentPlayer, isCurrentTarget, playerName, playerKey }) => {
  return (
    <div className="player-header">
      <Dashboard playerName={playerName} />
      {isCurrentPlayer ? <TurnSelector /> : isCurrentTarget ? <TargetSelector /> : null}
    </div>
  )
};

export default PlayerHeader;