import {detectDecimalSeparator} from './detect-decimal-separator';
import {isOperator, isParenthesis} from './postfix';

const tokenize = (expression: string) => {
  const tokens: string[] = [];
  let current = '';

  for (const token of expression) {
    if (token === '%' || isOperator(token) || isParenthesis(token)) {
      if (current !== '') {
        tokens.push(current);
      }

      current = '';
      tokens.push(token);
    } else {
      current += token;
    }
  }

  if (current !== '') {
    tokens.push(current);
  }

  return tokens;
};

const format = (token: string) => {
  const {decimal, unit} = detectDecimalSeparator();
  const [integerPart, decimalPart] = token.split(decimal);

  if (integerPart.length < 4) {
    return token;
  }

  const reversedInteger = integerPart
    .split('')
    .filter(value => value !== unit)
    .reverse();
  const formattedInteger = [];
  let i = 0;
  for (const value of reversedInteger) {
    if (i % 3 === 0 && i !== 0) {
      formattedInteger.unshift(unit);
    }

    formattedInteger.unshift(value);
    i++;
  }

  if (decimalPart !== undefined) {
    return `${formattedInteger.join('')}${decimal}${decimalPart}`;
  }

  return formattedInteger.join('');
};

export const formatUnits = (expression: string) => {
  const tokens = tokenize(expression);

  console.log(tokens);
  return tokens
    .map(token => {
      return format(token);
    })
    .join('');
};
