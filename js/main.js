import { TITLE, TYPE, CHECKIN, CHECKOUT, FEATURES, DESCRIPTION, PHOTOS } from './data';
import { getRandomNumber } from './util';
import { getRandomNoninteger } from './util';
import { getRandomElement } from './util';
import { getRandomArrayLength } from './util';
import './card.js';
import { disableFilters, enableFilters } from './filters.js';
import { disableAdForm, enableAdForm } from './form.js';

const deactivateApp = () => {
  disableAdForm();
  disableFilters();
};

const activateApp = () => {
  enableAdForm();
  enableFilters();
};

deactivateApp();
activateApp();

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

export { createAds };
