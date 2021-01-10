import Ambassador from './ambassador';
import Assassin from './assassin';
import Captain from './captain';
import Contessa from './contessa';
import Duke from './duke';
import * as cdt from '../../../util/styles';

export default {
  'ambassador': { ...Ambassador, textColor: cdt.green },
  'assassin': { ...Assassin, textColor: cdt.black },
  'captain': { ...Captain, textColor: cdt.blue },
  'contessa': { ...Contessa, textColor: cdt.red },
  'duke': { ...Duke, textColor: cdt.purple },
};