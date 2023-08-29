import {Operators, Postfix, isOperator} from './postfix';
import {Stack} from './stack';

class Calculator {
  private postfix: string[] = [];
  private stack = new Stack<string>();

  private calculation = (operator: Operators) => {
    const first = Number(this.stack.pop() ?? 0);
    const second = Number(this.stack.pop() ?? 0);

    switch (operator) {
      case '+':
        this.stack.push(String(second + first));
        return;
      case '-':
        this.stack.push(String(second - first));
        return;
      case '*':
        this.stack.push(String(second * first));
        return;
      case '/':
        this.stack.push(String(second / first));
        return;
      case '^':
        this.stack.push(String(Math.pow(second, first)));
    }
  };

  calculate = (expression: string, precision = 9) => {
    this.postfix = new Postfix(expression).convert();

    for (const item of this.postfix) {
      if (!isOperator(item)) {
        this.stack.push(item);
      } else {
        this.calculation(item);
      }
    }

    const result = Number(this.stack.pop());
    const isDecimal = result % 1 !== 0;
    return isDecimal ? Number(result.toFixed(precision)) : result;
  };
}

const calculator = new Calculator();
export const calculate = calculator.calculate;
