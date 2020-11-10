import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { createGameState } from '../../config/initial_state';
import { Redirect } from 'react-router-dom';

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
    return (
        <Redirect to={"/game/" + randomPIN} />
    )
}

export default CreateGame;