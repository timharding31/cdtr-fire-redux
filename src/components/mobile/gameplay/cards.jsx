import React from 'react';
import Card from '../../resusable/card';
import { usePlayer } from '../../../util/hooks/';
import './cards.css';

const PlayerCards = ({ isChooser, cardFunction, cardState, undoCardFunction }) => {
  const { playerCards } = usePlayer();
  const liveCards = Object.entries(playerCards);
  const numCards = liveCards.length;
  const divWidth = `${numCards > 2 ? '15vh' : '25vh'}`;
  const cardHeight = numCards > 2 ? '20vh' : '35vh';
  const { killedCardKey, challengeLossCardKey, exchangedCardKeys } = cardState;
  const renderCard = ([cardKey, character]) => {
    const isSelected = Boolean(cardKey === killedCardKey || cardKey === challengeLossCardKey || exchangedCardKeys.includes(cardKey));
    const buttonColor = exchangedCardKeys.includes(cardKey) ? 'green' : 'red';
    return (
        <Card
          isSelected={isSelected}
          isChooser={isChooser}
          cardFunction={cardFunction}
          undoCardFunction={undoCardFunction}
          buttonColor={buttonColor}
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