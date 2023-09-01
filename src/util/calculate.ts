import {Operators, Postfix, isOperator} from './postfix';
import {Stack} from './stack';

/**
 * @author Leonardo Carvalho
 */
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

  /**
   * @description evaluate postfix expressions into a single number
   * @param expression infix expression to be evaluated
   * @param precision number of decimal places
   * @returns evaluated expression
   */
  calculate = (expression: string, precision = 9) => {
    expression = isOperator(expression.at(-1) ?? '')
      ? expression
          .split('')
          .slice(0, expression.length - 1)
          .join('')
      : expression;
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
    this.stack.clear();
    return isDecimal ? Number(result.toFixed(precision)) : result;
  };
}

const calculator = new Calculator();
/**
 * @description evaluate postfix expressions into a single number
 * @param expression postfix expression to be evaluated
 * @param precision number of decimal places
 * @returns evaluated expression
 */
export const calculate = calculator.calculate;
