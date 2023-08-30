import {isNumber} from './keys';
import {insertAt} from '../../util/insert-at';
import {IKey} from './cutom-key';
import {isOperator, isParenthesis} from '../../util/postfix';
import {substitute} from './../../util/substitute';

export class OperatorKey implements IKey {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  action = (expression: string, cursorPosition: number) => {
    const previousToken = expression[cursorPosition - 1];
    const nextToken = expression[cursorPosition + 1];

    if (
      isNumber(previousToken) ||
      isParenthesis(previousToken) ||
      previousToken === '%'
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
      return this.value;
    }

    throw new Error('Invalid expression');
  };
}
