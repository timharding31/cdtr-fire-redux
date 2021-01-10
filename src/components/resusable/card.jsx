import React from 'react';
import styled from 'styled-components';
import Button from './button';
import allCharacters from './characters/';
import * as cdt from '../../util/styles';
const paperTexture = require('../../images/textures/paper_texture.png');

const Card = ({
  cardWidth,
  cardHeight,
  character,
  faceUp=true,
  cardKey,
  isChooser,
  cardFunction,
  undoCardFunction,
  isSelected,
  buttonColor,
}) => {


    // const cardData = useSelector(state => state.staticData.cards);
    // const firebase = useFirebase();
    // const firebaseRef = firebase.storage().ref();
    if (faceUp) {
      const {
        backgroundColor,
        brushStroke,
        counteraction,
        effect,
        image,
        name,
        symbol,
        textColor
      } = allCharacters[character];

        // const colorMatch = {
        //     ambassador: cdt.green,
        //     assassin: cdt.black,
        //     captain: cdt.blue,
        //     contessa: cdt.red,
        //     duke: cdt.purple
        // }

        // firebaseRef.child(image).getDownloadURL().then(url => {
        //   const imgElement = document.getElementById(`img-${cardKey}`);
        //   if (imgElement) imgElement.src = url;
        // });
        // firebaseRef.child(symbol).getDownloadURL().then(url => {
        //   const symbolElement = document.getElementById(`symbol-${cardKey}`);
        //   if (symbolElement) symbolElement.src = url;
        // });
        // firebaseRef.child(brushStroke).getDownloadURL().then(url => {
        //   const abilitiesElement = document.getElementById(`abilities-${cardKey}`);
        //   if (abilitiesElement) abilitiesElement.style.backgroundImage = `url(${url})`;
        // });
        // firebaseRef.child('textures/paper_texture.png').getDownloadURL().then(url => {
        //   const cardElement = document.getElementById(`card-${cardKey}`);
        //   if (cardElement) cardElement.style.backgroundImage = `url(${url})`;
        // });

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
            boxShadow: `0 0 10px 1px ${cdt.blackShadow}`,
            transition: `all .2s ease-in-out`,
            margin: '1px 0',
            backgroundImage: `url(${paperTexture.default})`
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
            visibility: `${Number(cardHeight.substring(0, 2)) < 35 ? 'hidden': 'visible'}`,
            backgroundImage: `url(${brushStroke})`
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
            color: textColor,
            position: 'absolute',
            transform: 'rotate(180deg)',
            margin: '0',
            padding: '0',
            right: '0%',
            top: '2.5%',
            bottom: 'auto',
            left: 'auto',
            fontSize: `${Number(cardHeight.substring(0,2))/6}vh`,
            textShadow: `0.25px 0.25px 0.5px ${cdt.blackShadow}`,
            fontWeight: '900',
            zIndex: '0',
            writingMode: 'vertical-lr',
            fontFamily: '\'Dancing Script\', cursive',
        }));

        const cardModal = isChooser ? (
          <div className="card-modal" style={{
            backgroundColor: cdt.blackShadow,
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0,
            width: '100%', height: '100%',
            boxSizing: 'border-box',
            padding: 0, margin: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}>
            {isSelected ?
              <Button text="Selected" onClick={undoCardFunction(cardKey)} color={buttonColor} /> :
              <Button text="Select" onClick={cardFunction(cardKey)} color="black" />}
          </div>
        ) : null;

        return (
            <StyledCard width={cardWidth} height={cardHeight} id={`card-${cardKey}`}>
                {cardModal}
                <div style={cardTintStyle} />
                <CardHeader color={'#4C9870'}>{name}</CardHeader>
                <img id={`img-${cardKey}`} src={image} style={cardImageStyle} />
                <img id={`symbol-${cardKey}`} src={symbol} style={cardSymbolStyle} />
                <ul id={`abilities-${cardKey}`} style={cardAbilitiesStyle} >
                    {[effect, counteraction].map((ability, idx) => (
                        <li key={`ability-${idx}`} style={cardAbilitiesListItemStyle}>
                            {ability}
                        </li>
                    ))}
                </ul>
            </StyledCard>
        );
    } else {
        return null
    }
};

export default Card