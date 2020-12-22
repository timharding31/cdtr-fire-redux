import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import App from './App';
import { constantState } from './config/initial_state';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";

// const turnReducer = (state={ currentPlayer: null, turnOrder: [] }, { type, player }) => {
//   const newState = {...state};
//   const playerIdx = newState.turnOrder.indexOf(player);
//   const currentPlayerIdx = newState.turnOrder.indexOf(newState.currentPlayer);
//   const numPlayers = newState.turnOrder.length;
//   switch (type) {
//     case 'add-player':
//       if (newState.turnOrder.includes(player)) {
//         return state;
//       } else {
//         newState.turnOrder = [...newState.turnOrder, player];
//         if (!newState.currentPlayer) newState.currentPlayer = player;
//         return newState;
//       }
//     case 'remove-player':
//       if (newState.turnOrder.includes(player)) {
//         newState.turnOrder.splice(playerIdx, 1);
//         return newState;
//       } else {
//         return state;
//       }
//     case 'end-turn':
//       newState.currentPlayer = newState.turnOrder[(currentPlayerIdx + 1) % numPlayers];
//       return newState;
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    staticData: (state={ ...constantState }) => state
});

const store = createStore(rootReducer, {}, applyMiddleware(logger));

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);
firebase.database();
firebase.storage();
firebase.auth().signInAnonymously().catch(error => alert(error.code, error.message));

const firebaseReactReduxProps = {
    firebase,
    config: {},
    dispatch: store.dispatch
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...firebaseReactReduxProps} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
