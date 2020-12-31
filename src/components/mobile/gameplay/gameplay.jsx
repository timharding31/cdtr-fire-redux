import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../../util/hooks/';
import PlayerCoins from './coins';
import PlayerCards from './cards';
import PlayerHeader from './header';
import './gameplay.css';

const GamePlay = ({ game }) => {
  const { isCurrentPlayer, isCurrentTarget, playerName, playerKey } = usePlayer();
  const [liveCards, setLiveCards] = useState([]);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    setCoins(game.hands.coins[playerKey]);
    setLiveCards(Object.entries(game.hands.liveCards[playerKey]));
  }, [game, playerKey]);

  return (
    <div className="player-gameplay-root">
      <div className="player-gameplay-background">
        <PlayerHeader isCurrentPlayer={isCurrentPlayer} isCurrentTarget={isCurrentTarget} playerName={playerName} playerKey={playerKey} />
        <PlayerCards liveCards={liveCards} numCards={liveCards.length}/>
        <PlayerCoins coins={coins}/>
        {/* <GamePlayFooter /> */}
      </div>
    </div>
  )
};


export default GamePlay;