import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import styled from 'styled-components';
import * as cdt from '../../../util/styles';

const FaceUpCard = ({
    cardId,
    action,
    backgroundColor,
    brushStroke,
    counteraction,
    effect,
    image,
    name,
    symbol,
    type,
    numCards
}) => {
    const firebase = useFirebase();
    const firebaseRef = firebase.storage().ref();
    firebaseRef.child(image).getDownloadURL().then(url => {
        document.getElementById(`img-${cardId}`).src = url;
    });
    firebaseRef.child(symbol).getDownloadURL().then(url => {
        document.getElementById(`symbol-${cardId}`).src = url;
    });
    firebaseRef.child(brushStroke).getDownloadURL().then(url => {
        document.getElementById(`abilities-${cardId}`).style.backgroundImage = `url(${url})`;
    });

    const StyledCard = styled.div(({ width, height }) => ({
        width,
        height,
        maxWidth: width,
        maxHeight: height,
        position: `relative`,
        border: `1px solid ${cdt.black}`,
        borderRadius: `20px`,
        overflow: `hidden`,
        backgroundRepeat: `repeat`,
        boxShadow: `0 0 10px ${cdt.blackShadow}`,
        transition: `all .2s ease-in-out`,
    }));

    const cardTintStyle = {
        backgroundColor,
        position: 'absolute',
        opacity: '0.2',
        height: '100%',
        width: '100%',
        left: '0',
        bottom: '0',
        top: '0',
        right: '0',
    };

    const cardImageStyle = {
        position: 'absolute',
        width: '100%',
        bottom: '0',
        left: '0',
        right: '0',
        top: 'auto',
        zIndex: '1',
    };

    const cardSymbolStyle = {
        position: 'absolute',
        width: '25%',
        top: '2.5%',
        left: '0',
        right: 'auto',
        bottom: 'auto',
        zIndex: '0',
    };

    const cardAbilitiesStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-start',
        position: 'absolute',
        width: '100%',
        height: '15%',
        bottom: '0',
        left: '0',
        right: '0',
        top: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '105% 95%',
        padding: '5% 0',
        zIndex: '2',
        boxSizing: 'border-box',
        opacity: '90%',
    };

    const cardAbilitiesListItemStyle = {
        fontSize: '80%',
        color: `${cdt.white}`,
        textIndent: '-5%',
        padding: '0',
        margin: '0',
        textShadow: `0.25px 0.25px 0px ${cdt.whiteShadow}`,
    }

    const CardHeader = styled.div(({ color }) => ({
        color,
        position: 'absolute',
        transform: 'rotate(180deg)',
        margin: '0',
        padding: '0',
        right: '2.5%',
        top: '5%',
        bottom: 'auto',
        left: 'auto',
        fontSize: '285%',
        textShadow: `0.25px 0.25px 0.5px ${cdt.blackShadow}`,
        fontWeight: '700',
        zIndex: '0',
        writingMode: 'vertical-lr',
    }));
    let cardWidth = '100%';
    let cardHeight = '35vh';
    if (numCards > 2) {
        cardHeight = '20vh';
    }
    console.log('numcards is ', numCards);

    return (
        <StyledCard width={cardWidth} height={cardHeight}>
            <div style={cardTintStyle} />
            <CardHeader color={'#4C9870'}>{name}</CardHeader>
            <img id={`img-${cardId}`} style={cardImageStyle} />
            <img id={`symbol-${cardId}`} style={cardSymbolStyle} />
            <ul style={cardAbilitiesStyle} id={`abilities-${cardId}`}>
                {[effect, counteraction].map((ability, idx) => (
                    <li key={`ability-${idx}`} style={cardAbilitiesListItemStyle}>
                        {ability}
                    </li>
                ))}
            </ul>
        </StyledCard>
    )

};

export default FaceUpCard