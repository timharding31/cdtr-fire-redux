import React from 'react';
import styled from 'styled-components';
// import Button from '../../resusable/button';
import Card from '../../resusable/card';
import Coin from '../../resusable/coin';

const PlayerView = ({ game, player, liveCards, coins }) => {
    if (game.status === 'Waiting for players') {
        return null
    }
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '15% 0 15% 0'
    }));

    const PlayerCoins = styled.div(() => ({
        position: 'absolute',
        top: 'auto', bottom: 0, left: '10%', right: 'auto',
        height: '100%',
        width: '6vh',
        maxWidth: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '15% 0 15% 0'
    }));

    const numCards = Object.keys(liveCards).length;
    const cardWidth = '100%';
    const cardHeight = numCards > 2 ? '20vh' : '35vh';
    const coinsRange = []
    while (coinsRange.length < coins) coinsRange.push('c');


    return (
        <PlayerRoot>
            <PlayerBackground>
                <PlayerHeader>
                    <p>{player}</p>
                    <p>{game.pin}</p>
                </PlayerHeader>
                <PlayerHand numCards={numCards}>
                    {Object.entries(liveCards).map(([cardKey, character]) => (
                        <Card cardKey={cardKey} character={character} key={cardKey} cardHeight={cardHeight} cardWidth={cardWidth} />
                    ))}
                </PlayerHand>
                <PlayerCoins>
                    {coinsRange.map((_,idx) => <Coin key={`coin-${idx}`} height={`8%`} />)}
                </PlayerCoins>
                <PlayerFooter>
                    <p>Coins: {coins}</p>
                    <p>Influence: {numCards}</p>
                </PlayerFooter>
            </PlayerBackground>
        </PlayerRoot>
    )
};

export default PlayerView