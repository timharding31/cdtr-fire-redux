const img = require('../../../images/characters/captain.png');
const symbol = require('../../../images/symbols/captain.png');
const brush = require('../../../images/brush-strokes/captain.png');

export default {
  name: 'Captain',
  image: img.default,
  symbol: symbol.default,
  action: 'Steal',
  effect: 'Steal',
  counteraction: 'Blocks Stealing',
  brushStroke: brush.default,
  backgroundColor: 'rgba(55, 97, 113, 0.5)',
}