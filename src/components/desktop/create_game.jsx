import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { createGameState } from '../../config/initial_state';
import { Redirect } from 'react-router-dom';
import { setupCourtDeck } from '../../util/game_setup';

const CreateGame = () => {
    const firebase = useFirebase();
    const games = useSelector(state => state.firebase.data.games);
    let randomPIN = Math.floor(Math.random() * 8999 + 1000).toFixed();
    if (games) {
        while (randomPIN in games) {
            randomPIN = Math.floor(Math.random() * 8999 + 1000).toFixed();
        }
    }
    const newGameState = createGameState(randomPIN);
    firebase.database().ref('games/' + randomPIN).set(newGameState);
    setupCourtDeck({ firebase, gamePIN: randomPIN });
    // ['ambassador', 'assassin', 'captain', 'contessa', 'duke'].forEach(character => {
    //     [1,2,3].forEach(number => {
    //         let courtDeckPath = gamePath + '/court/courtDeck/'
    //         let newCardKey = firebase.database().ref(courtDeckPath).push().key;
    //         firebase.database().ref(courtDeckPath + newCardKey).set(character);
    //     });
    // });
    return (
        <Redirect to={"/game/" + randomPIN} />
    )
}

export default CreateGame;