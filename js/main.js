const getRandomNumber = function (min, max) {
  if (max > min && min >= 0 && max > 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
  throw new RangeError('Некорректные значения в аргументах');
};
getRandomNumber(0, 20);

const getRandomNoninteger = function (min, max, decimalNumber) {
  if (max > min && min >= 0 && max > 0) {
    return (min + Math.random() * (max - min)).toFixed(decimalNumber);
  }
  throw new RangeError('Некорректные значения в аргументах');
};

getRandomNoninteger(0, 50, 2);


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


author:
  avatar: 'img/avatars/user0${i}.png',

offer:
  title,
  address: '{{location.lat}}, {{location.lng}}',
  price,
  type,
  rooms,
  guests,
  checkin: '12:00, 13:00, 14:00',
  checkout:'12:00, 13:00, 14:00',
  features: [wifi, dishwasher, parking, washer, elevator, conditioner],
  description,
  photos: [https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg,
           https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg,
           https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.]

location:
  lat: 'от 35.65000 до 35.70000',
  lng: 'от 139.70000 до 139.80000'
*/

const AUTHOR = [
  'avatar',
];

const OFFER = [
  'title',
  'address',
  'price',
  'type',
  'rooms',
  'guests',
  'checkin',
  'checkout',
  'features',
  'description',
  'photos',
];

const LOCATION = [
  'lat',
  'lng',
];

const createAds = (adNumber) => {
  const result = [];
  for (let i = 0; i <= adNumber; i++) {
    result[i] = i + 1;
  };
  const randomAuther = Math.floor(Math.random() * AUTHOR.length - 1);
  const randomOffer = Math.floor(Math.random() * OFFER.length - 1);
  const randomLocation = Math.floor(Math.random() * LOCATION.length - 1);


  return {
    author: AUTHOR,
    offer: OFFER,
    location: LOCATION,
  };
};

console.log(
  createAds()
);
