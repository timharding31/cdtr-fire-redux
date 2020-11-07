export const constantState = {
    cards: {
        ambassador: {
            name: "Ambassador",
            image: 'characterImages/ambassador.png',
            symbol: 'characterSymbols/ambassador.png',
            action: "Exchange",
            effect: "Exchange cards with Court Deck",
            counteraction: "Blocks stealing",
            brushStroke: 'characterBrushStrokes/ambassador.png',
            backgroundColor: "rgba(76, 152, 112, 0.5)"
        },
        assassin: {
            name: "Assassin",
            image: 'characterImages/assassin.png',
            symbol: 'characterSymbols/assassin.png',
            action: "Assassinate",
            effect: "Pay 3 coins to assassinate another player",
            counteraction: "",
            brushStroke: 'characterBrushStrokes/assassin.png',
            backgroundColor: "rgba(22, 28, 29, 0.5)"
        },
        captain: {
            name: "Captain",
            image: 'characterImages/captain.png',
            symbol: 'characterSymbols/captain.png',
            action: "Steal",
            effect: "Take 2 coins from another player",
            counteraction: "Blocks stealing",
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
            effect: "Take 3 coins from Treasury",
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

export const gameState = {};