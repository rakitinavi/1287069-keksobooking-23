const ANY_SELECT = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const CategoryPrice = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const filterForm = document.querySelector('.map__filters');
const filterSelects = filterForm.querySelectorAll('select');
const filterFeatures = filterForm.querySelector('.map__features');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');
const checkboxFeatures = housingFeatures.querySelectorAll('.map__checkbox');

const disableFilters = () => {
  filterForm.classList.add('map__filters--disabled');
  filterSelects.forEach((select) => {
    select.disabled = true;
  });
  filterFeatures.disabled = true;
};

const enableFilters = () => {
  filterForm.classList.remove('map__filters--disabled');
  filterSelects.forEach((select) => {
    select.disabled = false;
  });
  filterFeatures.disabled = false;
};

const filterHousingType = (ad) => {
  const filterValue = housingType.value;
  return filterValue === ANY_SELECT ? true : ad.offer.type === filterValue;
};

const filterHousingPrice = (ad) => {
  const filterValue = housingPrice.value;
  switch(filterValue) {
    case CategoryPrice.LOW:
      return ad.offer.price <= MIN_PRICE;
    case CategoryPrice.MIDDLE:
      return ad.offer.price >= MIN_PRICE && ad.offer.price <= MAX_PRICE;
    case CategoryPrice.HIGH:
      return ad.offer.price >= MAX_PRICE;
  }
  return true;
};

const filterHousingRooms = (ad) => {
  const filterValue = housingRooms.value;
  return filterValue === ANY_SELECT ? true : ad.offer.rooms === Number(filterValue);
};

const filterHousingGuests = (ad) => {
  const filterValue = housingGuests.value;
  return filterValue === ANY_SELECT ? true : ad.offer.guests === Number(filterValue);
};

const filterHousingFeatures = (ad) => Array.from(checkboxFeatures)
  .every((checkbox) => {
    if (!checkbox.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(checkbox.value);
  });

const getFilteredAds = (ads) => {
  const filteredAds = [];
  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];
    if (
      filterHousingType(ad) &&
      filterHousingPrice(ad) &&
      filterHousingRooms(ad) &&
      filterHousingGuests(ad) &&
      filterHousingFeatures(ad)
    ) {
      filteredAds.push(ad);
    }
  }
  return filteredAds;
};

export {
  disableFilters,
  enableFilters,
  getFilteredAds,
  filterForm
};

