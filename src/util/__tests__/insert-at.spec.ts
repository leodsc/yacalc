import {insertAt} from '../insert-at';

describe('insertAt function', () => {
  it('should insert 3 at index 4 in array [1, 2, 3, 4, 5, 6]', () => {
    expect(insertAt([1, 2, 3, 4, 5, 6], 4, 3)).toStrictEqual([
      1, 2, 3, 4, 3, 5, 6,
    ]);
  });

  it('should insert 3 at index 0 in array [1, 2, 3, 4, 5, 6]', () => {
    expect(insertAt([1, 2, 3, 4, 5, 6], 0, 3)).toStrictEqual([
      3, 1, 2, 3, 4, 5, 6,
    ]);
  });

  it('should insert 3 at index 6 in array [1, 2, 3, 4, 5, 6]', () => {
    expect(insertAt([1, 2, 3, 4, 5, 6], 6, 3)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 3,
    ]);
  });
});
