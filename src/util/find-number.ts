import {isOperator} from './postfix';

export const findNumber = (expression: string, cursorPosition: number) => {
  const findOperator = (operator: string) => isOperator(operator);
  const either = (
    notAcceptableValue: number,
    defaultValue: number,
    value: number,
  ) => (value === notAcceptableValue ? defaultValue : value);

  const operatorBeforeCursorIndex = expression
    .split('')
    .slice(0, cursorPosition)
    .findLastIndex(findOperator);

  const operatorAfterCursorIndex = expression
    .split('')
    .slice(cursorPosition)
    .findLastIndex(findOperator);

  const currentNumber = expression
    .split('')
    .slice(
      either(-1, 0, operatorBeforeCursorIndex),
      either(-1, expression.length, operatorAfterCursorIndex),
    )
    .join('');

  return currentNumber;
};
