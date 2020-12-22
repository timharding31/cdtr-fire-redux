import React from 'react';
import { useGameFunctions } from '../../../util/hooks';
import Button from '../../resusable/button';

const GamePlay = ({ players, numPlayers }) => {
  const { endTurn } = useGameFunctions();
  return (
    <>
      <p>gameplay</p>
      <Button onClick={endTurn} text="end turn" color="purple" fontSize="24px" />
    </>
  );
};

export default GamePlay;