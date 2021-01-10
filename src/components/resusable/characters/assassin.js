const img = require('../../../images/characters/assassin.png');
const symbol = require('../../../images/symbols/assassin.png');
const brush = require('../../../images/brush-strokes/assassin.png');

export default {
  name: 'Assassin',
  image: img.default,
  symbol: symbol.default,
  action: 'Assassinate',
  effect: 'Assassinate',
  counteraction: '',
  brushStroke: brush.default,
  backgroundColor: 'rgba(22, 28, 29, 0.5)',
}