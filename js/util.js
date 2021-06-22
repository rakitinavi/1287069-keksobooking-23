const getRandomNumber = function (min, max) {
  if (max > min && min >= 0 && max > 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}; /* Функция рандома целого числа*/

const getRandomNoninteger = function (min, max, decimalNumber) {
  if (max > min && min >= 0 && max > 0) {
    return (min + Math.random() * (max - min)).toFixed(decimalNumber);
  }
}; /* Функция рандом нецелого числа*/

const getRandomElement = (array) => array[getRandomNumber(0, array.length)]; /* Функция достающее рандомное значение из массива*/

const getRandomArrayLength = (array) => array.slice(1, getRandomNumber(1, array.length)); /*Функция которая будет рандомно отрезать массив*/


export { getRandomNumber };
export { getRandomNoninteger };
export { getRandomElement };
export { getRandomArrayLength };
