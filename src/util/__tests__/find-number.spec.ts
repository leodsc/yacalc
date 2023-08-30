import {findNumber} from '../find-number';

describe('find number function', () => {
  it('100+5 with cursor between 1 and 0 should return 100', () => {
    expect(findNumber('100+5', 1)).toBe('100');
  });

  it('100+5 with cursor between + and 5 should return 5', () => {
    expect(findNumber('100+5', 5)).toBe('+5');
  });

  it('103+5 with cursor between 0 and 3 should return 103', () => {
    expect(findNumber('103+5', 2)).toBe('103');
  });
});
