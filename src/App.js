import React, { useEffect } from 'react';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import { constantState } from './config/initial_state';
import './App.css';

const App = () => {
    const firebase = useFirebase();
    useFirebaseConnect('constant');
    useEffect(() => {
        firebase.set('constant', constantState);
    });

    return (
      <>
        <p>test</p>
      </>
  );
};

export default App
