export class Stack<T> {
  private stack: T[] = [];

  pop = () => {
    return this.stack.pop();
  };

  push = (value: T) => {
    this.stack.push(value);
  };

  peek = () => {
    return this.stack.at(-1);
  };

  size = () => {
    return this.stack.length;
  };

  clear = () => {
    this.stack = [];
  };

  [Symbol.iterator] = () => {
    let index = this.size();
    let data = this.stack;

    return {
      next: () => ({value: data[--index], done: !(index in data)}),
    };
  };
}
