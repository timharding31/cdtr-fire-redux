import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import "firebase/database";
import { firebaseConfig } from './config/firebase';
import './index.css';
import App from './App';
import store from './config/store';
import { firebaseReactReduxProps } from './config/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

ReactDOM.render(
  <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...firebaseReactReduxProps} >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
