import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../resusable/button';
import './header.css';
import { turnOptions } from '../../../config/turns';

const Dashboard = ({ playerName }) => {
  return <h1 className="player-header-information">{playerName}</h1>
};

const PlayerSelector = ({ game, turnStatus, turn, playerKey, selectTurnAction, playerCoins, allowBlock, challengeBlock }) => {
  const [choice, setChoice] = useState('');
  const allChoices = turnOptions(playerCoins);
  const renderChoices = ({ choiceName, choiceColor, choiceId }) => (
    <Button key={choiceId} buttonType="submit" onClick={() => setChoice(choiceName)} text={choiceName} color={choiceColor} />
  );

  const [target, setTarget] = useState('');
  const { users: { players } } = game;
  const allTargets = Object.entries(players).filter(([key, _]) => key !== playerKey);
  const renderTargets = ([targetKey, targetName]) => (
    <Button key={targetKey} buttonType="submit" onClick={() => setTarget(targetKey)} text={targetName} color="red" />
  );

  const [pageSelected, setPageSelected] = useState(1);

  const { blockerKey, wasActionBlocked, action } = turn;
  const blockerName = blockerKey ? players[blockerKey] : '';

  const allowBlockButton = wasActionBlocked ? <Button onClick={allowBlock} buttonType="button" text="Allow Block" color="green"/> : null;
  const challengeBlockButton = wasActionBlocked ? <Button onClick={challengeBlock} buttonType="button" text="Challenge Block" color="black" /> : null;

  const PageOne = ({ setPageSelected, selectTurnAction }) => (
    <form className={`player-selector ${pageSelected === 1 ? 'visible' : 'invisible'}`} onSubmit={(e) => {
      e.preventDefault();
      if (['Coup', 'Assassinate', 'Steal'].includes(choice)) {
        setPageSelected(2);
      } else {
        selectTurnAction(choice, target);
      }
    }} >
      <h3>Select an Action for your Turn:</h3>
      {allChoices.map(renderChoices)}
    </form>
  );

  const PageTwo = ({ selectTurnAction }) => (
    <form className={`player-selector ${pageSelected === 2 ? 'visible' : 'invisible'}`} onSubmit={(e) => {
      e.preventDefault();
      selectTurnAction(choice, target);
    }} >
      <h3>{`Select an Opponent to ${choice}${choice === 'Steal' ? ' from' : ''}:`}</h3>
      {allTargets.map(renderTargets)}
    </form>
  );

  if (turnStatus === 'playerChoosing') {
    return (
      <>
        <PageOne setPageSelected={setPageSelected} selectTurnAction={selectTurnAction} />
        <PageTwo selectTurnAction={selectTurnAction} />
      </>
    );
  } else if (turnStatus === 'playerRespondingToBlock') {
    return (
      <div className="player-selector">
        <h3>{`${blockerName} has elected to Block your attempt to ${action}. How will you respond?`}</h3>
        {allowBlockButton}
        {challengeBlockButton}
      </div>
    )
  } else {
    return null;
  }
};

const AudienceSelector = ({ game, turnStatus, turn, allowAction, blockAction, challengeAction }) => {
  const { userKey } = useParams();
  const { playerKey, targetKey, action, blockable, challengeable } = turn;
  const { users: { players } } = game;
  const currentPlayerName = players[playerKey];
  const currentTargetName = targetKey ? players[targetKey] : null;

  const allowButton = <Button onClick={allowAction} buttonType="button" text="Allow" color="green" />;
  const blockButton = (blockable && (targetKey === userKey || action === 'Foreign Aid')) ? <Button onClick={blockAction} buttonType="button" text="Block" color="red" /> : null;
  const challengeButton = challengeable ? <Button onClick={challengeAction} buttonType="button" text="Challenge" color="black" /> : null;

  if (turnStatus === 'opponentsResponding') {
    return (
      <div className="audience-selector">
        <h3>{`${currentPlayerName} has elected to ${action}${action === 'Steal' ? ' from' : ''}${currentTargetName ? ` ${currentTargetName}` : ''}. How will you respond?`}</h3>
        {allowButton}
        {blockButton}
        {challengeButton}
      </div>
    )

  } else {
    return null;
  }
};

const CardSelector = ({ isCurrentPlayer, isCurrentTarget, isBlocker, isChallenger, game, turnStatus, turn, isChoiceReady, menuFunction }) => {
  const { users: { players } } = game;
  const {
    action,
    playerKey,
    challengerKey,
    blockerKey,
    wasActionChallenged,
    wasBlockChallenged,
    challengerWonChallenge,
    blockerWonChallenge
  } = turn;
  const playerName = playerKey ? players[playerKey] : null;
  const challengerName = challengerKey ? players[challengerKey] : null;
  const blockerName = blockerKey ? players[blockerKey] : null;

  let message = '';
  if (wasActionChallenged && challengerWonChallenge && isCurrentPlayer) {
    message = `You've lost ${challengerName}'s challenge of your ${action}. Select an Influence to lose:`;
  } else if (wasActionChallenged && !challengerWonChallenge && isChallenger) {
    message = `You've lost your challenge of ${playerName}'s ${action}. Select an Influence to lose:`;
  } else if (wasBlockChallenged && blockerWonChallenge && isCurrentPlayer) {
    message = `You've lost your challenge of ${blockerName}'s Block. Select an Influence to lose:`;
  } else if (wasBlockChallenged && !blockerWonChallenge && isBlocker) {
    message = `You've lost ${playerName}'s challenge of your Block. Select an Influence to lose:`;
  } else if (turnStatus === 'targetChoosingKillCard' && isCurrentTarget) {
    message = `${playerName}'s ${action} was successful. Select an Influence to lose:`;
  } else if (turnStatus === 'playerChoosingExchange' && isCurrentPlayer) {
    message = `Select two Influences to return to the Court Deck:`;
  }

  const submitButton = isChoiceReady ?
    <Button onClick={menuFunction} text="Submit" color={action === 'Exchange' ? 'green' : 'red'} /> :
    <Button onClick={() => null} text="Submit" color={action === 'Exchange' ? 'green' : 'red'} filter="pale" />;

  return (
    <div className="card-selector">
      <h3>{message}</h3>
      {submitButton}
    </div>
  );
}

const PlayerHeader = (props) => {
  return (
    <div className="player-header">
      <Dashboard playerName={props.playerName} />
      {props.isCurrentPlayer ? <PlayerSelector {...props} /> : <AudienceSelector {...props} />}
      {props.isChooser ? <CardSelector {...props} /> : null}
    </div>
  )
};

export default PlayerHeader;