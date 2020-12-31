import React, { useEffect, useState } from 'react';
import { useCurrentPlayer, useGameFunctions } from '../../../util/hooks/';
import Button from '../../resusable/button';

const TurnSelector = ({ isCurrentPlayer, players, playerKey }) => {
  const { currentPlayerName } = useCurrentPlayer();
  const { startTurn } = useGameFunctions();
  const [choice, setChoice] = useState('');
  const [target, setTarget] = useState('nobody');
  const [targetOptions, setTargetOptions] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (['Coup', 'Steal', 'Assassinate'].includes(choice)) {
      setTargetOptions(Object.entries(players).filter(entry => entry[0] !== playerKey));
    } else {
      setTargetOptions([]);
    }
  }, [choice]);

  const submitTurnChoice = (e) => {
    e.preventDefault();
    if (choice === '') return;
    startTurn(choice, target);
  };

  const renderAction = (actionName, idx) => (
    <Button key={idx} color="red" fontSize="12px" onClick={(e) => { e.preventDefault(); setChoice(actionName); }} text={actionName} />
  );

  const renderTarget = ([targetKey, targetName]) => (
    <Button key={targetKey} color="purple" fontSize="12px" onClick={(e) => { e.preventDefault(); setTarget(targetName); }} text={targetName} />
  );

  if (isCurrentPlayer) {
    return null
    // return (
    //   <div className="turn-selector">
    //     <form onSubmit={submitTurnChoice}>
    //       {page > 1 ? null :
    //         <>
    //           <div>{['Income', 'Foreign Aid', 'Tax', 'Assassinate', 'Steal', 'Exchange', 'Coup'].map(renderAction)}</div>
    //           <Button color="blue" fontSize="14px" onClick={(e) => { e.preventDefault(); setPage(page + 1) }} text="Next" />
    //         </>
    //       }
    //       {page < 2 ? null :
    //         <>
    //           <div>{targetOptions.map(renderTarget)}</div>
    //           <Button color="green" fontSize="14px" onClick={(e) => (console.log(e))} text="Submit" />
    //         </>
    //       }
    //     </form>
    //   </div>
    // )
  } else {
    return null;
  }
};

export default TurnSelector