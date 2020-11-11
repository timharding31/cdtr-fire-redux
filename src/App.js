import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import { constantState } from './config/initial_state';
import './App.css';
import { useDeviceDetect } from './util/hooks';
import DesktopApp from './components/desktop';
import MobileApp from './components/mobile';

const App = () => {
    useFirebaseConnect('constant');
    const firebase = useFirebase();
    const constantData = useSelector(state => state.firebase.data.constant);
    useEffect(() => {
        if (JSON.stringify(constantData) === '{}') {
            firebase.set('constant', constantState);
            firebase.set('games', {});
        }
    }, [firebase, constantData]);

    const isMobile = useDeviceDetect();

    return (
        <>
            {isMobile ? <MobileApp /> : <DesktopApp />}
        </>
    );
};

export default App
