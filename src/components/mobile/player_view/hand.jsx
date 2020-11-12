import React, { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import FaceUpCard from './card';

const PlayerHand = ({ player, liveCards }) => {
    const cardData = useSelector(state => state.staticData.cards);
    return (
        <>
            <h1>{player}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '500px', height: '1000px'}}>
                {Object.entries(liveCards).map(([cardId, character]) => (
                    <FaceUpCard cardId={cardId} {...cardData[character]} key={cardId}/>
                ))}
            </div>
        </>
    )
};

export default PlayerHand