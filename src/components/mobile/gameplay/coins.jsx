import './coins.css';
import Coin from '../../resusable/coin';

const PlayerCoins = ({ coins }) => {
  let coinsArray = [];
  while (coinsArray.length < coins) coinsArray.push('c');

  const renderCoin = (_, idx) => (
    <Coin key={`coin-${idx}`} height={`8%`} />
  )

  return (
    <div className="player-coins">
      {coinsArray.map(renderCoin)}
    </div>
  )
};

export default PlayerCoins;