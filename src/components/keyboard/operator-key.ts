import {isNumber} from './keys';
import {insertAt} from '../../util/insert-at';
import {IKey} from './cutom-key';
import {isOperator, isParenthesis} from '../../util/postfix';
import {substitute} from './../../util/substitute';

export class OperatorKey implements IKey {
  value: string;
  testID: string;

  constructor(value: string, testID?: string) {
    this.value = value;
    this.testID = testID ? testID : `key-${value}`;
  }

  action = (expression: string, cursorPosition: number) => {
    const previousToken = expression[cursorPosition - 1];
    const nextToken = expression[cursorPosition];

    if (previousToken === '(' && nextToken === '(') {
      throw new Error('Invalid expression');
    }

    if (
      isNumber(previousToken) ||
      previousToken === '%' ||
      isParenthesis(previousToken)
    ) {
      return insertAt(expression.split(''), cursorPosition, this.value).join(
        '',
      );
    }

    if (isOperator(previousToken)) {
      return substitute(expression, cursorPosition - 1, this.value);
    }

    if (
      previousToken === undefined &&
      !isOperator(nextToken) &&
      this.value === '-'
    ) {
      return `${this.value}${expression}`;
    }

    throw new Error('Invalid expression');
  };
}
