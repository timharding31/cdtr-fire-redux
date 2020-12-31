import React from 'react';
import CreateGame from './desktop/create_game';
import GameContainer from './desktop/game_container';
import { Link, Route } from 'react-router-dom';

const DesktopApp = () => {
  return (
    <>
      <Route exact path="/" >
        <p>desktop app launched</p>
        <Link to="/new">Create Game</Link>
      </Route>
      <Route exact path="/new" component={CreateGame} />
      <Route path="/game/:gamePIN" component={GameContainer} />
      <br />
      <br />
      <h3>Custom Hook Info</h3>
      <ul style={{listStyle: 'none'}}>
        <li>{`useNewGame => creates blank game state, sets up court deck, and returns game PIN for redirect`}</li>
        <li>{`useGame => { wasGameFound, game }`}</li>
        <li>{`usePlayers => { werePlayersFound, players, numPlayers }`}</li>
        <li>{`useCurrentPlayer => { wasCurrentPlayerFound, currentPlayerKey, currentPlayerName }`}</li>
        <li>{`usePlayer => { wasPlayerFound, isCurrentPlayer, playerName, playerKey }`}</li>
        <li>{`useTurn => { isTurnActive, turnAction, turnChallenge }`}</li>
        <br />
        <li>{`useGameFunctions——`}
          <p>{`endTurn = () => { ... }`}</p>
          <p>{`exchangePartOne = (player) => { ... }`}</p>
          <p>{`loseInfluence = (player, cardKey) => { ... }`}</p>
          <p>{`payForAssassination = (player) => { ... }`}</p>
          <p>{`payForCoup = (player) => { ... }`}</p>
          <p>{`receiveFromForeignAid = (player) => { ... }`}</p>
          <p>{`receiveFromIncome = (player) => { ... }`}</p>
          <p>{`receiveFromTax = (player) => { ... }`}</p>
          <p>{`returnExchangedInfluence = (player, cardKey) => { ... }`}</p>
          <p>{`returnReshuffledInfluence = (player, cardKey) => { ... }`}</p>
          <p>{`startGame = () => { ... }`}</p>
          <p>{`stealCoins = (player, target) => { ... }`}</p>
          <p>{`switchTurns = () => { ... }`}</p>
          <p>{`startTurn = (playerKey, targetKey, playerChoice) => { ... }`}</p>
          <p>{`allowAction = () => { ... }`}</p>
          <p>{`challengeAction = (challengerKey) => { ... }`}</p>
          <p>{`blockAction = (blockerKey) => { ... }`}</p>
          <p>{`challengeBlock = () => { ... }`}</p>
          <p>{`allowBlock = () => { ... }`}</p>
          <p>{`submitChallengeLossChoice = (loserKey, cardKey) => { ... }`}</p>
          <p>{`challengeOutcome = () => { ... }`}</p>
          <p>{`submitKillChoice = (cardKey) => { ... }`}</p>
          <p>{`submitExchangeChoices = (exchangedCardKeys) => { ... }`}</p>
          <p>{`actionOutcome = () => { ... }`}</p>
        </li>
      </ul>
    </>
  )
}

export default DesktopApp