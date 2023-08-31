import {insertAt} from '../../util/insert-at';
import {IKey} from './cutom-key';

export class NumberKey implements IKey {
  value: string;
  testID: string;

  constructor(value: string, testID?: string) {
    this.value = value;
    this.testID = testID ? testID : `key-${value}`;
  }

  action = (expression: string, cursorPosition: number) => {
    const previousToken = expression[cursorPosition - 1];

    if (previousToken === '%') {
      return insertAt(
        expression.split(''),
        cursorPosition,
        `x${this.value}`,
      ).join('');
    }
    return insertAt(expression.split(''), cursorPosition, this.value).join('');
  };
}
