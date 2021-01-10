const img = require('../../../images/characters/duke.png');
const symbol = require('../../../images/symbols/duke.png');
const brush = require('../../../images/brush-strokes/duke.png');

export default {
  name: 'Duke',
  image: img.default,
  symbol: symbol.default,
  action: 'Tax',
  effect: 'Tax',
  counteraction: 'Blocks Foreign Aid',
  brushStroke: brush.default,
  backgroundColor: 'rgba(138, 49, 123, 0.5)',
}