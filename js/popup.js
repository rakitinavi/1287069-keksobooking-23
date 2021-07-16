import {isEscEvent, isEnterEvent} from './utils.js';
import {PopupType} from './constants.js';

const popupTemplate = {
  [PopupType.ERROR]: document.querySelector('#error').content.querySelector('.error'),
  [PopupType.SUCCESS]: document.querySelector('#success').content.querySelector('.success'),
};

let activePopup = null;

function removePopup() {
  if (activePopup !== null) {
    activePopup.remove();
    document.removeEventListener('keydown', onPopupKeyDown);
    activePopup = null;
  }
}

function onPopupKeyDown (evt) {
  if (isEscEvent(evt) || isEnterEvent(evt)) {
    evt.preventDefault();
    removePopup();
  }
}

function onPopupClick () {
  removePopup();
}

const showPopup = (popupType) => {
  activePopup = popupTemplate[popupType].cloneNode(true);
  document.body.insertAdjacentElement('afterbegin', activePopup);
  activePopup.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupKeyDown);
};

export {showPopup};
