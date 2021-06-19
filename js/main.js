/*
В файле main.js на основе написанных в прошлом задании вспомогательных функций напишите необходимые функции для создания
массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.

Структура каждого объекта должна быть следующей:

author, объект — описывает автора. Содержит одно поле:

avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10.Перед однозначными
числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.

offer, объект — содержит информацию об объявлении. Состоит из полей:

title, строка — заголовок предложения. Придумайте самостоятельно.

address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат
по маске {{location.lat}}, {{location.lng}}.

price, число — стоимость. Случайное целое положительное число.

type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.

rooms, число — количество комнат. Случайное целое положительное число.

guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.

checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner.
Значения не должны повторяться.

description, строка — описание помещения. Придумайте самостоятельно.

photos, массив строк — массив случайной длины из значений:
https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg,
https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg,
https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

location, объект — местоположение в виде географических координат. Состоит из двух полей:

lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.

lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
*/

const TITLE = ['Дворец', 'Квартира', 'Дом', 'Бунгало', 'Отель']
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel']
const CHECKIN = ['12:00', '13:00', '14:00']
const CHECKOUT = ['12:00', '13:00', '14:00']
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
const DESCRIPTION = ['Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.', 'Одноэтажный дом для одной семьи', 'Роскошный дворец с прекрасным видом и со своим бассейном', 'К услугам гостей номера с кондиционером и общий лаундж.', 'Для королевских особ и людей с утонченным вкусом.']
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg']


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

const createAds = (adNumber) => { /*Функция, которая создает объект нужной структуры*/
  const result = [];

  for (let i = 1; i <= adNumber; i += 1) {


    const locationX = Number(getRandomNoninteger(1, 100, 10));
    const locationY = Number(getRandomNoninteger(1, 150, 10));

    result.push({
      'author': {
        'avatar': `img/avatars/user0${i}.png`,
      },
      'offer': {
        'title': getRandomElement(TITLE),
        'address': `${locationX}, ${locationY}`,
        'price': getRandomNumber(500, 100000),
        'type': getRandomElement(TYPE),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 7),
        'checkin': getRandomElement(CHECKIN),
        'checkout': getRandomElement(CHECKOUT),
        'features': getRandomArrayLength(FEATURES),
        'description': getRandomElement(DESCRIPTION),
        'photos': getRandomArrayLength(PHOTOS),
      },
      'location': {
        'lat': locationX,
        'lng': locationY,
      },
    });
  }
  return result;
};

console.log(createAds(8));
