export const constantState = {
    cards: {
        ambassador: {
            name: "Ambassador",
            image: 'characterImages/ambassador.png',
            symbol: 'characterSymbols/ambassador.png',
            action: "Exchange",
            effect: "Exchange",
            counteraction: "Blocks Stealing",
            brushStroke: 'characterBrushStrokes/ambassador.png',
            backgroundColor: "rgba(76, 152, 112, 0.5)"
        },
        assassin: {
            name: "Assassin",
            image: 'characterImages/assassin.png',
            symbol: 'characterSymbols/assassin.png',
            action: "Assassinate",
            effect: "Assassinate",
            counteraction: "",
            brushStroke: 'characterBrushStrokes/assassin.png',
            backgroundColor: "rgba(22, 28, 29, 0.5)"
        },
        captain: {
            name: "Captain",
            image: 'characterImages/captain.png',
            symbol: 'characterSymbols/captain.png',
            action: "Steal",
            effect: "Steal",
            counteraction: "Blocks Stealing",
            brushStroke: 'characterBrushStrokes/captain.png',
            backgroundColor: "rgba(55, 97, 113, 0.5)"
        },
        contessa: {
            name: "Contessa",
            image: 'characterImages/contessa.png',
            symbol: 'characterSymbols/contessa.png',
            action: "",
            effect: "",
            counteraction: "Blocks Assassination",
            brushStroke: 'characterBrushStrokes/contessa.png',
            backgroundColor: "rgba(155, 51, 42, 0.5)"
        },
        duke: {
            name: "Duke",
            image: 'characterImages/duke.png',
            symbol: 'characterSymbols/duke.png',
            action: "Tax",
            effect: "Tax",
            counteraction: "Blocks Foreign Aid",
            brushStroke: 'characterBrushStrokes/duke.png',
            backgroundColor: "rgba(138, 49, 123, 0.5)"
        }
    },
    actions: {
        income: {
            blockable: false,
            challengeable: false,
            hasTarget: false,
            coinsRequired: 0,
            charactersClaimed: [],
            symbol: 'characterSymbols/income.png'
        },
        foreignAid: {
            blockable: true,
            challengeable: false,
            hasTarget: false,
            coinsRequired: 0,
            charactersClaimed: [],
            symbol: 'characterSymbols/foreign_aid.png'
        },
        coup: {
            blockable: false,
            challengeable: false,
            hasTarget: true,
            coinsRequired: 7,
            charactersClaimed: [],
            symbol: 'characterSymbols/coup.png'
        },
        tax: {
            blockable: false,
            challengeable: true,
            hasTarget: false,
            coinsRequired: 0,
            charactersClaimed: [
                "duke"
            ],
            symbol: 'characterSymbols/duke.png'
        },
        assassinate: {
            blockable: true,
            challengeable: true,
            hasTarget: true,
            coinsRequired: 3,
            charactersClaimed: [
                "assassin"
            ],
            symbol: 'characterSymbols/assassin.png'
        },
        exchange: {
            blockable: false,
            challengeable: true,
            hasTarget: false,
            coinsRequired: 0,
            charactersClaimed: [
                "ambassador"
            ],
            symbol: 'characterSymbols/ambassador.png'
        },
        steal: {
            blockable: true,
            challengeable: true,
            hasTarget: true,
            coinsRequired: 0,
            charactersClaimed: [
                "captain"
            ],
            symbol: 'characterSymbols/captain.png'
        }
    },
    counterActions: {
        blockForeignAid: {
            challengeable: true,
            charactersClaimed: [
                "duke"
            ]
        },
        blockAssassinate: {
            challengeable: true,
            charactersClaimed: [
                "contessa"
            ]
        },
        blockSteal: {
            challengeable: true,
            charactersClaimed: [
                "captain",
                "ambassador"
            ]
        }
    }
};

export const createGameState = (pin) => ({
    pin,
    status: "Waiting for players",
    users: {
        allUsers: '',
        players: '',
        spectators: '',
    },
    hands: {
        liveCards: '',
        deadCards: '',
        coins: ''
    },
    court: {
        treasury: 50,
        courtDeck: ''
    },
    turns: {
        currentTurn: {
            action: {
                playerChoice: '',
                wasBlocked: '',
                wasChallenged: '',
                wasAllowed: '',
                wasSuccessful: '',
                isComplete: '',
                target: '',
                challenger: '',
                blocker: '',
                loserCardKey: '',
                exchangeReturnKeys: ''
            },
            challenge: {
                challenger: '',
                challengee: {
                    name: '',
                    hasCard: '',
                    cardKey: ''
                },
                loser: '',
                loserCardKey: ''
            }
        },
        previousTurns: ''
    }
});