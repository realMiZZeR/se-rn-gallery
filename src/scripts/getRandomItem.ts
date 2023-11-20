/**
 * Возвращает случайный элемент из массива.
 * @param list Ссылка на массив.
 */
export const getRandomItem = <T>(list: Array<T>): T | null => {
  console.log(list[0]);
  if (list === null) {
    return null;
  }
  return list[Math.floor(Math.random() * list.length)];
};
