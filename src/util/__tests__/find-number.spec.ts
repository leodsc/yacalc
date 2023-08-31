import {findNumber} from '../find-number';

describe('find number function', () => {
  it('100+5 with cursor between 1 and 0 should return 100', () => {
    expect(findNumber('100+5', 1)).toBe('100');
  });

  it('100+5 with cursor between + and 5 should return 5', () => {
    expect(findNumber('100+5', 4)).toBe('5');
  });

  it('103+5 with cursor between 0 and 3 should return 103', () => {
    expect(findNumber('103+5', 2)).toBe('103');
  });

  it('1039834+93295*9920 with cursor between 2 and 0 should return 9920', () => {
    expect(findNumber('1039834+93295*9920', 17)).toBe('9920');
  });

  it('1039834+93295*9920 with cursor between 9 and 5 should return +93295', () => {
    expect(findNumber('1039834+93295*9920', 12)).toBe('93295');
  });
});
