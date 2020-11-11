import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import './App.css';
import { useDeviceDetect } from './util/hooks';
import DesktopApp from './components/desktop';
import MobileApp from './components/mobile';

const App = () => {
    useFirebaseConnect('games');
    const firebase = useFirebase();
    const firebaseData = useSelector(state => state.firebase.data);
    useEffect(() => {
        if (!firebaseData.games) {
            firebase.set('games', {})
        };
    }, [firebaseData]);

    const isMobile = useDeviceDetect();

    return (
        <>
            {isMobile ? <MobileApp /> : <DesktopApp />}
        </>
    );
};

export default App
