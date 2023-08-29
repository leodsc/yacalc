import {detectDecimalSeparator} from '../../util/detect-decimal-separator';
import {findNumber} from '../../util/find-number';
import {insertAt} from '../../util/insert-at';
import {isOperator} from '../../util/postfix';
import {IKey, CustomKey} from './cutom-key';
import {NumberKey} from './number-key';
import {OperatorKey} from './operator-key';

export const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value));
};

const clearKey = new CustomKey('C', _expression => '');

const parenthesisKey = new CustomKey(
  '()',
  (expression: string, cursorPosition: number) => {
    const previousToken = expression[cursorPosition - 1];
    const totalOpenParenthesis = expression
      .split('')
      .slice(0, cursorPosition)
      .filter(token => token === '(').length;
    const totalCloseParenthesis = expression
      .split('')
      .slice(0, cursorPosition)
      .filter(token => token === ')').length;

    if (
      (isNumber(previousToken) || previousToken === ')') &&
      totalOpenParenthesis !== totalCloseParenthesis
    ) {
      return insertAt(expression.split(''), cursorPosition, ')').join('');
    }

    if (isNumber(previousToken) || previousToken === ')') {
      return insertAt(expression.split(''), cursorPosition, 'x(').join('');
    } else {
      return insertAt(expression.split(''), cursorPosition, '(').join('');
    }
  },
);

const percentageKey = new CustomKey(
  '%',
  (expression: string, cursorPosition: number) => {
    if (isNumber(expression[cursorPosition - 1])) {
      return insertAt(expression.split(''), cursorPosition, '%').join('');
    }

    throw new Error('Invalid expression');
  },
);

const backKey = new CustomKey(
  'B',
  (expression: string, cursorPosition: number) => {
    if (expression.length === 0) {
      return '';
    }
    const splittedExpression = expression.split('');
    splittedExpression.splice(cursorPosition - 1, 1);
    return splittedExpression.join('');
  },
);

const commaKey = new CustomKey(
  detectDecimalSeparator().decimal,
  (expression: string, cursorPosition: number) => {
    const previousToken = expression[cursorPosition - 1];
    const currentNumber = findNumber(expression, cursorPosition);
    const numberIsDecimal =
      Number(currentNumber.replaceAll(detectDecimalSeparator().unit, '')) %
        1 !==
      0;

    if (isNumber(previousToken) && !numberIsDecimal) {
      return insertAt(
        expression.split(''),
        cursorPosition,
        detectDecimalSeparator().decimal,
      ).join('');
    }

    throw new Error('Invalid expression');
  },
);

const equalKey = new CustomKey('=', _expression => '=');

export const keys: IKey[] = [
  clearKey,
  parenthesisKey,
  percentageKey,
  new OperatorKey('÷'),
  new NumberKey('7'),
  new NumberKey('8'),
  new NumberKey('9'),
  new OperatorKey('+'),
  new NumberKey('4'),
  new NumberKey('5'),
  new NumberKey('6'),
  new OperatorKey('x'),
  new NumberKey('1'),
  new NumberKey('2'),
  new NumberKey('3'),
  new OperatorKey('-'),
  backKey,
  new NumberKey('0'),
  commaKey,
  equalKey,
];

export type Keys = keyof typeof keys;
