import './card.js';
import './filters.js';
import './form.js';
import './map.js';
import './popup.js';
import './photo.js';

import {form, disableAdForm, enableAdForm, resetAdForm, resetButton, setAddressInput} from './form.js';
import {getData, sendData} from './api.js';
import {renderAdMarkers, removeAdMarkers, initMap, resetMap} from './map.js';
import {showAlert, debounce} from './utils.js';
import {disableFilters, enableFilters, getFilteredAds, filterForm} from './filters.js';
import {DefaultCoords, PopupType} from './constants.js';
import {showPopup} from './popup.js';

let adsData;

const showMessageError = (error) => {
  showAlert(`Не удалось загрузить объявления ${error}`);
};

const onFilterChange = debounce((ads) => {
  const newAds = getFilteredAds(ads);
  removeAdMarkers();
  renderAdMarkers(newAds);
});

const resetApp = () => {
  resetMap();
  removeAdMarkers();
  resetAdForm();
  filterForm.reset();
  renderAdMarkers(adsData);
};

const deactivateApp = () => {
  disableAdForm();
  disableFilters();
};

const activateApp = () => {
  enableAdForm();
  enableFilters();
  getData()
    .then((ads) => {
      adsData = ads;
      renderAdMarkers(ads);
      filterForm.addEventListener('change', () => {
        onFilterChange(ads);
      });
    })
    .catch(showMessageError);
};

const setFormSubmit = (send) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    send(evt.target)
      .then(() => showPopup(PopupType.SUCCESS))
      .then(resetApp)
      .catch(() => showPopup(PopupType.ERROR));
  });
};

const initApp = () => {
  deactivateApp();
  initMap({
    onMapLoad: activateApp,
    onMainPinDrag: setAddressInput,
  });
  setAddressInput({lat: DefaultCoords.LAT, lng: DefaultCoords.LNG});
  setFormSubmit(sendData);

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetApp();
  });
};

initApp();


