import React from 'react';
import Card from '../../resusable/card';
import './cards.css';

const PlayerCards = ({ liveCards, numCards, isChooser, cardFunction, cardState, undoCardFunction }) => {
  const divWidth = `${numCards > 2 ? '15vh' : '25vh'}`;
  const cardHeight = numCards > 2 ? '20vh' : '35vh';
  const { killedCardKey, challengeLossCardKey, exchangedCardKeys } = cardState;
  const renderCard = ([cardKey, character]) => {
    const isSelected = Boolean(cardKey === killedCardKey || cardKey === challengeLossCardKey || exchangedCardKeys.includes(cardKey));
    return (
        <Card
          isSelected={isSelected}
          isChooser={isChooser}
          cardFunction={cardFunction}
          undoCardFunction={undoCardFunction}
          cardKey={cardKey}
          character={character}
          key={cardKey}
          cardHeight={cardHeight}
          cardWidth="100%"
        />
      );
  };

  return (
    <div className="player-hand" style={{width: divWidth}}>
      {liveCards.map(renderCard)}
    </div>
  );
}

export default PlayerCards;