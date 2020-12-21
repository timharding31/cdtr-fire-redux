import React from 'react';
import CreateGame from './desktop/create_game';
import GameContainer from './desktop/game_container';
import { Link, Route } from 'react-router-dom';

const DesktopApp = () => {
    return (
        <>
            <Route exact path="/" >
                <p>desktop app launched</p>
                <Link to="/new">Create Game</Link>
            </Route>
            <Route exact path="/new" component={CreateGame} />
            <Route path="/game/:gamePIN" component={GameContainer} />
        </>
    )
}

export default DesktopApp