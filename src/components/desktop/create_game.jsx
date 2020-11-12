import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { createGameState } from '../../config/initial_state';
import { Redirect } from 'react-router-dom';
import { setupCourtDeck } from '../../util/game_setup';

const CreateGame = () => {
    const firebase = useFirebase();
    const games = useSelector(state => state.firebase.data.games);
    let gamePIN = Math.floor(Math.random() * 8999 + 1000).toFixed();
    if (games) {
        while (gamePIN in games) {
            gamePIN = Math.floor(Math.random() * 8999 + 1000).toFixed();
        }
    }
    const newGameState = createGameState(gamePIN);
    firebase.database().ref('games/' + gamePIN).set(newGameState);
    setupCourtDeck({ firebase, gamePIN });
    
    return <Redirect to={"/game/" + gamePIN} />
}

export default CreateGame;