import React, { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const JoinGame = () => {
  const firebase = useFirebase();
  const games = useSelector(state => state.firebase.data.games);
  const [userPin, setUserPin] = useState('');
  const [pinMatch, setPinMatch] = useState(false);
  const [isUsernameDuplicate, setDuplicateUsername] = useState(false);
  const [username, setUsername] = useState('');
  const [userKey, setUserKey] = useState('');
  const [isJoined, setJoined] = useState(false);
  const [error, setError] = useState('');

  const updatePin = (e) => {
    e.preventDefault();
    if (isNaN(e.currentTarget.value)) {
      return
    } else {
      setUserPin(e.currentTarget.value);
    }
  };

  const updateName = (e) => {
    e.preventDefault();
    setUsername(e.currentTarget.value.substring(0, 10));
  };

  useEffect(() => {
    if (games) setPinMatch(Boolean(userPin in games));
    if (pinMatch) setDuplicateUsername(Boolean(Object.values(games[userPin].users.allUsers).includes(username)));
  }, [games, userPin, username, pinMatch, isUsernameDuplicate]);

  const joinGame = (e) => {
    e.preventDefault();
    if (userPin.length < 4) {
      setPinMatch(false);
      setError('Game PIN must be 4 numbers');
    } else if (isUsernameDuplicate) {
      setError('That username has already been chosen, please choose another');
      setUsername('');
    } else if (pinMatch) {
      const gamePath = '/games/' + userPin + '/users/';
      const newUserKey = firebase.database().ref(gamePath).push().key;
      setUserKey(newUserKey);
      let updates = { [gamePath + '/allUsers/' + newUserKey]: username };
      if (games[userPin].status === 'Waiting for players') {
        updates[gamePath + '/players/' + newUserKey] = username;
        if (games[userPin].users.players.length === 0) {
          updates['/games/' + userPin + '/turns/currentPlayer'] = newUserKey;
        }
      } else {
        updates[gamePath + '/spectators/' + newUserKey] = username;
      }
      firebase.database().ref().update(updates, (err) => {
        if (err) {
            setError(err);
        } else {
            setError('');
            setJoined(true);
        }
      });
    } else {
      setPinMatch(false);
      setError('PIN not found, please try again');
      setUserPin('');
    }
  };

  if (isJoined) {
      return <Redirect to={"/game/" + userPin + "/" + userKey} />
  } else {
      return (
          <form onSubmit={joinGame}>
              <div className="join-game-error">{error}</div>
              <br/>
              <label htmlFor="game-pin">Game PIN:
              <input required type="text" onChange={updatePin} value={userPin} placeholder="ex. 1234" id="game-pin"/>
              </label>
              <br/>
              <label htmlFor="user-name">Username:
              <input required type="text" onChange={updateName} value={username} placeholder="max 10 characters" id="user-name"/>
              </label>
              <br/>
              <button type="submit">Join Game</button>
          </form>
      )
  }
}

export default JoinGame