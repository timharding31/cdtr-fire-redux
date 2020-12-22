export const newBlankTurn = (playerChoice, target) => ({
  action: {
    playerChoice,
    wasBlocked: 'pending',
    wasChallenged: 'pending',
    wasAllowed: 'pending',
    wasSuccessful: 'pending',
    isComplete: false,
    target,
    challenger: 'pending',
    blocker: 'pending',
    loserCardKey: 'pending',
  },
  challenge: {
    challenger: 'pending',
    challengee: {
      name: 'pending',
      hasCard: 'pending',
      cardKey: 'pending'
    },
    loser: 'pending',
    loserCardKey: 'pending'
  }
});