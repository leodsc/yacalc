type Action = (expression: string, cursorPosition: number) => string;

export interface IKey {
  value: string;
  action: Action;
  testID: string;
}

export class CustomKey implements IKey {
  value: string;
  action: Action;
  testID: string;

  constructor(value: string, action: Action, testID?: string) {
    this.value = value;
    this.action = action;
    this.testID = testID ? testID : `key-${value}`;
  }
}
