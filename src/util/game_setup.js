export const setupCourtDeck = ({ firebase, gamePIN }) => {
    ['ambassador', 'assassin', 'captain', 'contessa', 'duke'].forEach(character => {
        [1, 2, 3].forEach(_ => {
            let courtDeckPath = 'games/' + gamePIN + '/court/courtDeck/';
            let newCardKey = firebase.database().ref(courtDeckPath).push().key;
            firebase.database().ref(courtDeckPath + newCardKey).set(character);
        });
    });
};

export const dealHands = ({ firebase, players, gamePIN }) => {
    let courtDeckRef = firebase.database().ref('games/' + gamePIN + '/court/courtDeck');
    courtDeckRef.once('value', snapshot => {
        [0,1].forEach(_ => {
            players.forEach(player => {
                let courtDeck = snapshot.val();
                let courtDeckKeys = Object.keys(courtDeck);
                let randomCardKey = courtDeckKeys[Math.floor(Math.random() * courtDeckKeys.length)];
                let randomCard = courtDeck[randomCardKey];
                courtDeckRef.child(randomCardKey).remove();
                firebase.database().ref('games/' + gamePIN + '/hands/liveCards/' + player).update({ [randomCardKey]: randomCard })
            });
        })
    });
}