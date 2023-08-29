export const substitute = (
  value: string | string[],
  position: number,
  newValue: string,
) => {
  value = Array.isArray(value) ? value : value.split('');

  value[position] = newValue;
  return value.join('');
};
