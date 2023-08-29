import {Stack} from './stack';

export type Operators = '+' | '-' | '*' | '/' | '^';
type Parenthesis = '(' | ')';

type OperatorPrecedenceType = {
  [Operator in Operators]: number;
};

const OperatorPrecedence: OperatorPrecedenceType = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
  '^': 3,
};

export const isOperator = (value: string): value is Operators => {
  return ['+', '-', '*', '/', '^'].includes(value);
};

export const isParenthesis = (value?: string): value is Parenthesis => {
  return value !== undefined && ['(', ')'].includes(value);
};

export class Postfix {
  private infix: string[];
  private postfix: string[] = [];
  private stack = new Stack<Operators | Parenthesis>();

  constructor(infixExpression: string) {
    this.infix = this.parse(infixExpression);
    console.log(this.infix);
  }

  private parse(expression: string) {
    let tokens = [];
    let current = '';

    for (const item of expression) {
      if (isOperator(item) || isParenthesis(item)) {
        if (current !== '') {
          tokens.push(current);
        }

        tokens.push(item);
        current = '';
      } else if (item !== ' ') {
        current += item;
      }
    }

    if (current !== '') {
      tokens.push(current);
    }

    return tokens.map(token => token.replace(',', '.'));
  }

  convert = () => {
    for (const value of this.infix) {
      if (isOperator(value)) {
        this.popUntilLessPrecedenceOrEmpty(value);
        this.stack.push(value);
      } else if (isParenthesis(value)) {
        this.handleParenthesis(value);
      } else {
        this.postfix.push(value);
      }
    }

    this.addRemainingOperators();
    return this.postfix;
  };

  private popUntilLessPrecedenceOrEmpty = (value: Operators) => {
    let peek = this.stack.peek();

    if (peek === undefined || isParenthesis(peek)) {
      return;
    }

    while (
      this.stack.size() !== 0 &&
      OperatorPrecedence[peek] >= OperatorPrecedence[value]
    ) {
      const poppedValue = this.stack.pop();
      if (poppedValue !== undefined) {
        this.postfix.push(poppedValue);
      }

      peek = this.stack.peek();
    }
  };

  private addRemainingOperators = () => {
    for (const value of this.stack) {
      this.postfix.push(value);
    }

    this.stack.clear();
  };

  private handleParenthesis = (value: Parenthesis) => {
    if (value === '(') {
      this.stack.push(value);
    } else {
      for (const item of this.stack) {
        if (item === '(') {
          this.stack.pop();
          break;
        }
        const poppedValue = this.stack.pop();
        if (poppedValue !== undefined) {
          this.postfix.push(poppedValue);
        }
      }
    }
  };
}
