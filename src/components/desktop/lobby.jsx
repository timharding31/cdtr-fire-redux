import React from 'react';
import Button from '../resusable/button';

const Lobby = ({ status, pin, numPlayers, playerEntries, startGame, werePlayersFound }) => {
  const playerList = playerEntries.map(([key, player]) => <li key={key}>{player}</li>);
  return (
    <>
      <div>Game PIN is {pin}</div>
      <p>Status: {status}</p>
      <ul>Players ({numPlayers}/6)
        {playerList}
      </ul>
      {werePlayersFound ? <Button color={'blue'} text={'Start Game'} fontSize={'18px'} onClick={startGame} /> : null}
    </>
  );
}

export default Lobby;