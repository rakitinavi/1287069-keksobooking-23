import { createAds } from './main.js';

const AD_NUM = 1;
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('.map__canvas');
const houseTypeDisplay = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const fillElementAdsData = (adsData, element, text) => {
  if (!adsData) {
    return element.classList.add('visually-hidden');
  }
  element.textContent = text;
};

const fillTemplateCard = ({ author, offer }) => {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.popup__title');
  const cardAddress = card.querySelector('.popup__text--address');
  const cardPrice = card.querySelector('.popup__text--price');
  const cardType = card.querySelector('.popup__type');
  const cardCapacity = card.querySelector('.popup__text--capacity');
  const cardCheckTime = card.querySelector('.popup__text--time');
  const cardFeatures = card.querySelector('.popup__features');
  const cardPhotos = card.querySelector('.popup__photos');
  const cardAvatar = card.querySelector('.popup__avatar');
  const cardDescription = card.querySelector('.popup__description');

  fillElementAdsData(offer.title, cardTitle, offer.title);
  fillElementAdsData(offer.address, cardAddress, offer.address);
  fillElementAdsData(offer.price, cardPrice, `${offer.price} ₽/ночь`);
  fillElementAdsData(offer.type, cardType, houseTypeDisplay[offer.type]);
  fillElementAdsData(offer.description, cardDescription, offer.description);

  if (!author.avatar) {
    cardAvatar.classList.add('visually-hidden');
  } else {
    cardAvatar.src = author.avatar;
  }

  if (!(offer.rooms) & !(offer.guests)) {
    cardCapacity.classList.add('visually-hidden');
  } else {
    cardCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if (!(offer.checkin) & !(offer.checkout)) {
    cardCheckTime.classList.add('visually-hidden');
  } else {
    cardCheckTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }

  const fillElementDataArray = (element, array, handler) => {
    element.innerHTML = '';
    if (!array) {
      element.classList.add('visually-hidden');
    } else {
      array.forEach(handler);
    }
  };

  fillElementDataArray(cardFeatures, offer.features, (arrayItem) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add(
      'popup__feature',
      `popup__feature--${arrayItem}`,
    );
    cardFeatures.appendChild(featureElement);
  });

  fillElementDataArray(cardPhotos, offer.photos, (arrayItem) => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photoElement.src = arrayItem;
    cardPhotos.appendChild(photoElement);
  });

  return card;
};

const createCards = (ads) => {
  const similarAdsFragment = document.createDocumentFragment();

  ads.forEach((card) => {
    const element = fillTemplateCard(card);
    similarAdsFragment.appendChild(element);
    similarAdsFragment.appendChild(fillTemplateCard(card));
  });
  return map.appendChild(similarAdsFragment);
};
createCards(createAds(AD_NUM));
