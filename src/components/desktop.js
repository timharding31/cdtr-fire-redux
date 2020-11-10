import React from 'react';
import CreateGame from './desktop/create_game';
import Game from './desktop/game';
import { Link, Route } from 'react-router-dom';
import { useFirebaseConnect } from 'react-redux-firebase';

const DesktopApp = () => {
    useFirebaseConnect('games');
    return(
        <>
        <Route exact path="/" >
        <p>desktop app launched</p>
        <Link to="/new">Create Game</Link>
        </Route>
        <Route exact path="/new" component={CreateGame} />
        <Route path="/game/:gamePIN" component={Game} />
        </>
    )
}

export default DesktopApp;