export const loseInfluence = ({ firebase, player, gamePIN, cardKey }) => {
    let allHandsRef = firebase.database().ref('games/' + gamePIN + '/hands');
    let lostCardRef = allHandsRef.child('liveCards/' + player).child(cardKey);
    lostCardRef.once('value', snapshot => {
        let card = { [cardKey]: snapshot.val() };
        lostCardRef.remove();
        allHandsRef.child('deadCards/' + player).update(card);
    });
};

export const returnInfluence = ({ firebase, player, gamePIN, cardKey }) => {
    let gameRef = firebase.database().ref('games/' + gamePIN);
    let lostCardRef = gameRef.child('hands/liveCards/' + player).child(cardKey);
    let courtDeckRef = gameRef.child('court/courtDeck');
    lostCardRef.once('value', snapshot => {
        let card = { [cardKey]: snapshot.val() };
        lostCardRef.remove();
        courtDeckRef.update(card);
    });
    courtDeckRef.once('value', snapshot => {
        let courtDeck = snapshot.val();
        let courtDeckKeys = Object.keys(courtDeck);
        let randomCardKey = courtDeckKeys[Math.floor(Math.random() * courtDeckKeys.length)];
        let randomCard = courtDeck[randomCardKey];
        courtDeckRef.child(randomCardKey).remove();
        gameRef.child('hands/liveCards/' + player).update({ [randomCardKey]: randomCard })
    });
};

export const receiveCoins = ({ firebase, player, gamePIN, amount }) => {
    let gameRef = firebase.database().ref('games/' + gamePIN);
    gameRef.child('/court/treasury').set(firebase.database.ServerValue.increment(-amount));
    gameRef.child('/hands/coins/' + player).set(firebase.database.ServerValue.increment(amount))
};

export const payCoins = ({ firebase, player, gamePIN, amount }) => {
    let gameRef = firebase.database().ref('games/' + gamePIN);
    gameRef.child('/court/treasury').set(firebase.database.ServerValue.increment(amount));
    gameRef.child('/hands/coins/' + player).set(firebase.database.ServerValue.increment(-amount));
};

export const stealCoins = ({ firebase, player, target, gamePIN }) => {
    let coinsRef = firebase.database().ref('games/' + gamePIN + '/hands/coins');
    coinsRef.child(target).once('value', snapshot => {
        let targetCoins = snapshot.val();
        let stealAmount = Math.min(2, targetCoins);
        coinsRef.child(target).set(firebase.database.ServerValue.increment(-stealAmount));
        coinsRef.child(player).set(firebase.database.ServerValue.increment(stealAmount));
    });
};

export const exchangePartOne = ({ firebase, player, gamePIN }) => {
    let gameRef = firebase.database().ref('games/' + gamePIN);
    let playerCardsRef = gameRef.child('hands/liveCards/' + player);
    let courtDeckRef = gameRef.child('court/courtDeck');
    [0,1].forEach(_ => {
        courtDeckRef.once('value', snapshot => {
            let courtDeck = snapshot.val();
            let courtDeckKeys = Object.keys(courtDeck);
            let randomCardKey = courtDeckKeys[Math.floor(Math.random() * courtDeckKeys.length)];
            let randomCard = courtDeck[randomCardKey];
            courtDeckRef.child(randomCardKey).remove();
            playerCardsRef.update({ [randomCardKey]: randomCard });
        });
    });
};

export const exchangePartTwo = ({ firebase, player, gamePIN, cardKeys }) => {
    let allHandsRef = firebase.database().ref('games/' + gamePIN + '/hands');
    let courtDeckRef = gameRef.child('court/courtDeck');
    allHandsRef.child('liveCards/' + player).once('value', snapshot => {
        let playerHand = snapshot.val();
        let cards = {};
        cardKeys.forEach(cardKey => {
            cards[cardKey] = playerHand[cardKey];
            allHandsRef.child('liveCards/' + player).child(cardKey).remove();
        });
        courtDeckRef.update(cards);
    });
};

export const proveChallenge = ({ firebase, player, gamePIN, cardsClaimed }) => {
    let gameRef = firebase.database().ref('games/' + gamePIN);
    let challengeeRef = gameRef.child('turns/currentTurn/challenge/challengee')
    challengeeRef.set({
        name: player,
        hasCard: false,
        cardKey: null
    });
    gameRef.child('hands/liveCards/' + player).once('value', snapshot => {
        let playerHand = snapshot.val();
        cardsClaimed.forEach(card => {
            if (Object.values(playerHand).includes(card)) {
                let cardKey = Object.keys(playerHand).find(key => playerHand[key] === card);
                challengeeRef.set({
                    name: player,
                    hasCard: true,
                    cardKey
                });
            }
        });
    });
};