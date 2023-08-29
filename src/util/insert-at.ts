export const insertAt = <T>(arr: T[], index: number, value: T) => {
  const newArr = [];
  let passed = false;
  for (let i = 0; i < arr.length; i++) {
    if (i === index) {
      newArr.push(value);
      passed = true;
    }
    newArr.push(arr[i]);
  }

  if (!passed) {
    newArr.push(value);
  }

  return newArr;
};
