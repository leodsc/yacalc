import {isOperator, isParenthesis} from './postfix';

/**
 * @author Leonardo Carvalho
 * @description Will find a number based on the index passed to the function, a number is considered as anything between two operators
 * @example
 * cursorPosition = 2;
 * expression = 100+3;
 * const number = findNumber(expression, cursorPosition); // 100
 * @param expression - expression which the number should be found
 * @param cursorPosition - from where it should find the number in the expression
 * @returns number which the cursor
 */
export const findNumber = (expression: string, cursorPosition: number) => {
  const findOperator = (operator: string) =>
    isOperator(operator) || isParenthesis(operator);
  const either = (
    notAcceptableValue: number,
    defaultValue: number,
    value: number,
  ) => (value === notAcceptableValue ? defaultValue : value);

  const operatorBeforeCursorIndex = expression
    .split('')
    .slice(0, cursorPosition)
    .findLastIndex(findOperator);

  // we need to sum the cursorPosition because when slicing the cursorPosition index will be 0
  // even though we can be on the middle of the expression
  const operatorAfterCursorIndex =
    expression.split('').slice(cursorPosition).findLastIndex(findOperator) +
    cursorPosition;

  const currentNumber = expression
    .split('')
    .slice(
      either(-1, 0, operatorBeforeCursorIndex + 1),
      either(-1 + cursorPosition, expression.length, operatorAfterCursorIndex),
    )
    .join('');

  return currentNumber;
};
