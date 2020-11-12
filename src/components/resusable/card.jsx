import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import styled from 'styled-components';
import * as cdt from '../../util/styles';

const Card = ({ cardWidth, cardHeight, character, faceUp=true, cardKey }) => {
    const cardData = useSelector(state => state.staticData.cards);
    const firebase = useFirebase();
    const firebaseRef = firebase.storage().ref();
    if (faceUp) {
        const {
            backgroundColor,
            brushStroke,
            counteraction,
            effect,
            image,
            name,
            symbol
        } = cardData[character];

        const colorMatch = {
            ambassador: cdt.green,
            assassin: cdt.black,
            captain: cdt.blue,
            contessa: cdt.red,
            duke: cdt.purple
        }

        firebaseRef.child(image).getDownloadURL().then(url => {
            document.getElementById(`img-${cardKey}`).src = url;
        });
        firebaseRef.child(symbol).getDownloadURL().then(url => {
            document.getElementById(`symbol-${cardKey}`).src = url;
        });
        firebaseRef.child(brushStroke).getDownloadURL().then(url => {
            document.getElementById(`abilities-${cardKey}`).style.backgroundImage = `url(${url})`;
        });

        firebaseRef.child('textures/paper_texture.png').getDownloadURL().then(url => {
            document.getElementById(`card-${cardKey}`).style.backgroundImage = `url(${url})`;
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
            justifyContent: 'space-around',
            alignContent: 'flex-start',
            position: 'absolute',
            width: '115%',
            height: '25%',
            bottom: '-5%',
            left: '-15%',
            right: '0',
            top: 'auto',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '110% 95%',
            padding: '5% 5% 7.5% 35%',
            zIndex: '2',
            boxSizing: 'border-box',
            opacity: '90%',
            listStyle: 'none',
            visibility: `${Number(cardHeight.substring(0, 2)) < 35 ? 'hidden': 'visible'}`
        };

        const cardAbilitiesListItemStyle = {
            fontSize: '14px',
            color: `${cdt.white}`,
            fontStyle: 'italic',
            textIndent: '-5%',
            padding: '0',
            margin: '0',
            textShadow: `0.25px 0.25px 1px ${cdt.white}`
        }

        const CardHeader = styled.h2(() => ({
            color: colorMatch[character],
            position: 'absolute',
            transform: 'rotate(180deg)',
            margin: '0',
            padding: '0',
            right: '2.5%',
            top: '5%',
            bottom: 'auto',
            left: 'auto',
            fontSize: `${Number(cardHeight.substring(0,2))/7}vh`,
            textShadow: `0.25px 0.25px 0.5px ${cdt.blackShadow}`,
            fontWeight: '700',
            zIndex: '0',
            writingMode: 'vertical-lr'
        }));

        return (
            <StyledCard width={cardWidth} height={cardHeight} id={`card-${cardKey}`}>
                <div style={cardTintStyle} />
                <CardHeader color={'#4C9870'}>{name}</CardHeader>
                <img id={`img-${cardKey}`} style={cardImageStyle} />
                <img id={`symbol-${cardKey}`} style={cardSymbolStyle} />
                <ul id={`abilities-${cardKey}`} style={cardAbilitiesStyle} >
                    {[effect, counteraction].map((ability, idx) => (
                        <li key={`ability-${idx}`} style={cardAbilitiesListItemStyle}>
                            {ability}
                        </li>
                    ))}
                </ul>
            </StyledCard>
        )
    } else {
        return null
    }
};

export default Card