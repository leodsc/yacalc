import {substitute} from '../substitute';

describe('substitute function', () => {
  it('replace 9+3- to 9+3+', () => {
    expect(substitute('9+3-', 3, '+')).toBe('9+3+');
  });

  it('replace 9*3- to 9/3-', () => {
    expect(substitute(['9', '*', '3', '-'], 1, '/')).toBe('9/3-');
  });
});
