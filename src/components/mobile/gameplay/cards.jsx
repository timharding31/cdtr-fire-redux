import React from 'react';
import Card from '../../resusable/card';
import './cards.css';

const PlayerCards = ({ liveCards, numCards }) => {
  const divWidth = `${numCards > 2 ? '15vh' : '25vh'}`;
  const cardHeight = numCards > 2 ? '20vh' : '35vh';
  const renderCard = ([cardKey, character]) => (
    <Card cardKey={cardKey} character={character} key={cardKey} cardHeight={cardHeight} cardWidth="100%" />
  );

  return (
    <div className="player-hand" style={{width: divWidth}}>
      {liveCards.map(renderCard)}
    </div>
  );
}

export default PlayerCards;