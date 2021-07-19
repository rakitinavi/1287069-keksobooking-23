import { DefaultCoords } from './constants.js';
import { onChooserChange } from './photo.js';

const COORD_DIGITS_AMOUNT = 5;
const MAX_TITLE_LENGTH = 100;
const MIN_TITLE_LENGTH = 30;
const AVATAR_DEFAULT = 'img/muffin-grey.svg';

const roomsValue = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const minPriceForNight = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};


const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const formAdTitle = form.querySelector('#title');
const roomsSelect = form.querySelector('#room_number');
const guestsSelect = form.querySelector('#capacity');
const optionCapacityGuests = guestsSelect.querySelectorAll('option');
const price = form.querySelector('#price');
const typeOfHouseSelect = form.querySelector('#type');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const address = form.querySelector('#address');
const resetButton = form.querySelector('.ad-form__reset');
const avatarChooser = form.querySelector('.ad-form__field input[type=file]');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const housePhotoChooser = form.querySelector('.ad-form__upload input[type=file]');
const housePreviewContainer = form.querySelector('.ad-form__photo');

const setAddressInput = ({ lat, lng }) => {
  address.value = `${lat.toFixed(COORD_DIGITS_AMOUNT)}, ${lng.toFixed(COORD_DIGITS_AMOUNT)}`;
};

const resetAdForm = () => {
  form.reset();
  setAddressInput({ lat: DefaultCoords.LAT, lng: DefaultCoords.LNG });
  price.placeholder = minPriceForNight[typeOfHouseSelect.value];
  avatarPreview.src = AVATAR_DEFAULT;
  housePreviewContainer.innerHTML = '';
};

const onTitleInput = () => {
  const valueLength = formAdTitle.value.length;
  let error = '';

  if (valueLength < MIN_TITLE_LENGTH) {
    error = `Еще ${MIN_TITLE_LENGTH - valueLength} симв.`;
  } else if (valueLength > MAX_TITLE_LENGTH) {
    error = `Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`;
  }

  formAdTitle.setCustomValidity(error);
  formAdTitle.reportValidity();
};

const onTimeChange = (evt) => {
  timeInSelect.value = evt.target.value;
  timeOutSelect.value = evt.target.value;
};

const onTypeOfHouseChange = () => {
  const typeOfHouse = typeOfHouseSelect.value;
  price.setAttribute('min', minPriceForNight[typeOfHouse]);
  price.placeholder = minPriceForNight[typeOfHouse];
};

const onRoomChange = (evt) => {
  optionCapacityGuests.forEach((option) => {
    option.disabled = true;
  });

  roomsValue[evt.target.value].forEach((seatsAmount) => {
    optionCapacityGuests.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const onAvatarChooserChange = (evt) => {
  onChooserChange(evt.target, avatarPreview);
};

const onHousePhotoChooserChange = (evt) => {
  const housePhotoPreview = document.createElement('img');
  housePhotoPreview.style.cssText = 'width: 100%; height: 100%; object-fit: cover';
  housePreviewContainer.appendChild(housePhotoPreview);
  onChooserChange(evt.target, housePhotoPreview);
};

const disableAdForm = () => {
  form.classList.add('ad-form--disabled');

  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  formAdTitle.removeEventListener('input', onTitleInput);
  typeOfHouseSelect.removeEventListener('change', onTypeOfHouseChange);
  roomsSelect.removeEventListener('change', onRoomChange);
  timeInSelect.removeEventListener('change', onTimeChange);
  timeOutSelect.removeEventListener('change', onTimeChange);
  avatarChooser.removeEventListener('change', onAvatarChooserChange);
  housePhotoChooser.removeEventListener('change', onHousePhotoChooserChange);
};

const enableAdForm = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  formAdTitle.addEventListener('input', onTitleInput);
  typeOfHouseSelect.addEventListener('change', onTypeOfHouseChange);
  roomsSelect.addEventListener('change', onRoomChange);
  timeInSelect.addEventListener('change', onTimeChange);
  timeOutSelect.addEventListener('change', onTimeChange);
  avatarChooser.addEventListener('change', onAvatarChooserChange);
  housePhotoChooser.addEventListener('change', onHousePhotoChooserChange);
};

export {
  disableAdForm,
  enableAdForm,
  setAddressInput,
  resetAdForm,
  form,
  resetButton
};

