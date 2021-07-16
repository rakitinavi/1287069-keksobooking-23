import {fillTemplateCard} from './card.js';
import {DefaultCoords} from './constants.js';

const AD_COUNT = 10;
const MAP_ZOOM = 11;
const MAINPIN_WIDTH = 52;
const MAINPIN_HEIGHT = 52;
const MAINPIN_MIDDLE_WIDTH = 26;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;
const PIN_MIDDLE_WIDTH = 20;

let map;
let adMarkersGroup;

const mainPin = L.marker(
  {
    lat: DefaultCoords.LAT,
    lng: DefaultCoords.LNG,
  },
  {
    draggable: true,
    icon: L.icon({
      iconUrl: 'img/main-pin.svg',
      iconSize: [MAINPIN_WIDTH, MAINPIN_HEIGHT],
      iconAnchor: [MAINPIN_MIDDLE_WIDTH, MAINPIN_HEIGHT],
    }),
  },
);

const createAdMarker = (ad) => {
  const { lat, lng } = ad.location;
  const adMarker = L.marker(
    { lat, lng },
    {
      icon: L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [PIN_WIDTH, PIN_HEIGHT],
        iconAnchor: [PIN_MIDDLE_WIDTH, PIN_HEIGHT],
      }),
    },
  );

  adMarker
    .addTo(adMarkersGroup)
    .bindPopup(
      fillTemplateCard(ad),
      {
        keepInView: true,
      },
    );
};

const initMap = ({ onMapLoad, onMainPinDrag }) => {
  map = L.map('map-canvas')
    .on('load', onMapLoad)
    .setView({
      lat: DefaultCoords.LAT,
      lng: DefaultCoords.LNG,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPin.addTo(map);

  adMarkersGroup = L.layerGroup().addTo(map);

  mainPin.on('drag', (evt) => {
    onMainPinDrag(evt.target.getLatLng());
  });
};

const renderAdMarkers = (ads) => {
  ads.slice(0, AD_COUNT).forEach((ad) => createAdMarker(ad));
};

const resetMap = () => {
  mainPin.setLatLng({
    lat: DefaultCoords.LAT,
    lng: DefaultCoords.LNG,
  });
  map.setView({
    lat: DefaultCoords.LAT,
    lng: DefaultCoords.LNG,
  }, MAP_ZOOM);
};

const removeAdMarkers = () => {
  adMarkersGroup.clearLayers();
};

export {initMap, resetMap, renderAdMarkers, removeAdMarkers};

