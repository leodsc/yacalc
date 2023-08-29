type Action = (expression: string, cursorPosition: number) => string;

export interface IKey {
  value: string;
  action: Action;
}

export class CustomKey implements IKey {
  value: string;
  action: Action;

  constructor(value: string, action: Action) {
    this.value = value;
    this.action = action;
  }
}
