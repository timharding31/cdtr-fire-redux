const img = require('../../../images/characters/ambassador.png');
const symbol = require('../../../images/symbols/ambassador.png');
const brush = require('../../../images/brush-strokes/ambassador.png');

export default {
  name: 'Ambassador',
  image: img.default,
  symbol: symbol.default,
  action: 'Exchange',
  effect: 'Exchange',
  counteraction: 'Blocks stealing',
  brushStroke: brush.default,
  backgroundColor: 'rgba(76, 152, 112, 0.5)',
}