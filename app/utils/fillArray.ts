export const fillArray = <T>(array: T[], length: number) => {
  if (array.length >= length) return array;

  let index = 0;
  while (array.length < length) {
    if (index === array.length - 1) {
      index = 0;
    }

    const element = array[index];
    if (!element) continue;

    array.push(element);
    index++;
  }

  return array;
}
