import React from 'react';
import { Redirect } from 'react-router-dom';
import { useNewGame } from '../../util/hooks/';

const CreateGame = () => {
  const gamePIN = useNewGame();
  return <Redirect to={"/game/" + gamePIN} />
}

export default CreateGame;