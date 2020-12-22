import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import JoinGame from './mobile/join_game';
import Game from './mobile/game';

const MobileApp = () => {
  return (
    <>
      <Route exact path="/" component={() => <Redirect to="/join" />} />
      <Route exact path="/join" component={JoinGame} />
      <Route path="/game/:gamePIN/:userKey" component={Game} />
    </>
  )
};

export default MobileApp