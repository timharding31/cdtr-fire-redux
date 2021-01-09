export const turnOptions = (numCoins) => {
  const allTurns = [
    { choiceId: 101, choiceName: 'Income', choiceColor: 'yellow' },
    { choiceId: 102, choiceName: 'Foreign Aid', choiceColor: 'purple' },
    { choiceId: 103, choiceName: 'Coup', choiceColor: 'red' },
    { choiceId: 104, choiceName: 'Tax', choiceColor: 'purple' },
    { choiceId: 105, choiceName: 'Assassinate', choiceColor: 'black' },
    { choiceId: 106, choiceName: 'Exchange', choiceColor: 'green' },
    { choiceId: 107, choiceName: 'Steal', choiceColor: 'blue' },
  ];
  if (numCoins >= 10) {
    return [{ choiceId: 103, choiceName: 'Coup', color: 'red' }];
  } else if (numCoins >= 7) {
    return allTurns;
  } else if (numCoins >= 3) {
    return allTurns.filter(({ choiceName }) => choiceName !== 'Coup');
  } else {
    return allTurns.filter(({ choiceName }) => !['Coup', 'Assassinate'].includes(choiceName));
  }
}