import {isNumber} from '../components/keyboard/keys';
import {detectDecimalSeparator} from './detect-decimal-separator';

const format = (value: string) => {
  if (value.length < 3) {
    return value;
  }

  let i = 0;
  const formattedValue = [];
  const reversedValues = value.split('').reverse();

  for (const v of reversedValues) {
    if (v === '.') break;

    if (i % 3 === 0 && i !== 0) {
      formattedValue.unshift(',');
    }
    formattedValue.unshift(v);
    i += 1;
  }

  return formattedValue.join('');
};

export const formatUnits = (expression: string) => {
  const {unit} = detectDecimalSeparator();
  expression = expression.replaceAll(unit, '');
  let current = '';
  const tokens = [];

  for (const token of expression) {
    if (isNumber(token)) {
      current += token;
    } else {
      tokens.push(current);
      tokens.push(token);
      current = '';
    }
  }

  if (current.length > 0) {
    tokens.push(current);
  }

  for (const [index, token] of tokens.entries()) {
    tokens[index] = format(token);
  }

  return tokens.join('');
};
