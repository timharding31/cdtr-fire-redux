import React, { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import FaceUpCard from './card';

const PlayerHand = ({ player, liveCards }) => {
    const cardData = useSelector(state => state.staticData.cards);
    return (
        <>
            <h1>{player}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '500px', height: '1000px'}}>
                {Object.values(liveCards).map(character => (
                    <FaceUpCard {...cardData[character]} />
                ))}
            </div>
        </>
    )
};

export default PlayerHand