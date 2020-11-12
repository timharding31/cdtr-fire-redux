import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FaceUpCard from './card';

const PlayerView = ({ game, player, liveCards, coins }) => {
    const cardData = useSelector(state => state.staticData.cards);

    const PlayerRoot = styled.div(() => ({
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0,
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
    }));

    const PlayerBackground = styled.div(() => ({
        position: 'relative',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
    }));

    const PlayerHeader = styled.div(() => ({
        position: 'absolute',
        top: 0, bottom: 'auto', left: 0, right: 0,
        width: '100%',
        height: '10%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    }));

    const PlayerFooter = styled.div(() => ({
        position: 'absolute',
        top: 'auto', bottom: 0, left: 0, right: 0,
        width: '100%',
        height: '10%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline'
    }));

    const PlayerHand = styled.div(({ numCards }) => ({
        position: 'absolute',
        top: 'auto', bottom: 0, right: '17.5%', left: 'auto',
        height: '100%',
        width: `${ numCards > 2 ? '15vh' : '25vh'}`,
        maxWidth: '75%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '15% 0 15% 0'
    }));

    const PlayerCoins = styled.div(() => ({
        position: 'absolute',
        top: 'auto', bottom: '5%', right: '5%', left: 'auto',
        height: '72%',
        width: '6vh',
        maxWidth: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        boxSizing: 'border-box'
    }))


    return (
        <PlayerRoot>
            <PlayerBackground>
                <PlayerHeader>
                    <p>{player}</p>
                    <p>{game.pin}</p>
                </PlayerHeader>
                <PlayerHand numCards={Object.keys(liveCards).length}>
                    {Object.entries(liveCards).map(([cardId, character]) => (
                        <FaceUpCard numCards={Object.keys(liveCards).length} cardId={cardId} {...cardData[character]} key={cardId} />
                    ))}
                </PlayerHand>
                <PlayerCoins>
                        {coins}
                </PlayerCoins>
                <PlayerFooter>
                        <p>Coins: {coins}</p>
                        <p>Influence: {liveCards.length}</p>
                </PlayerFooter>
            </PlayerBackground>
        </PlayerRoot>
    )
};

export default PlayerView