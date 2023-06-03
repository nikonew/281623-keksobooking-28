import { ADS_PIN_PANE, ANY_FILTER_VALUE, DEBOUNCE_TIMEOUT } from './data.js';
import { activateForm } from './form.js';
import { getOffers } from './template.js';
import { debounce } from './util.js';

const adressIn = document.querySelector('#address');


const defaultView = {
  center: [ 35.6894875, 139.6917064 ],
  zoom: 13
};

const map = L.map('map-canvas');

const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const myIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [ 52, 52 ],
  iconAnchor: [ 26, 52 ],
});

map.whenReady((ad) => {
  activateForm(ad);
});
const handlerDrag = (event) => {
  adressIn.value = `${ event.latlng.lat.toFixed(3) }, ${ event.latlng.lng.toFixed(3) }`;
};

const marker = L.marker(
  defaultView.center,
  {icon: myIcon, draggable: true, autoPan: true, autoPanPadding: L.point(100, 100)}
)
  .on('drag', handlerDrag);

const iconOfferPin = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [ 40, 40 ],
  iconAnchor: [ 20, 20 ],
  popupAnchor: [ 0, -20 ]
});

let ads = [];
// nameFilter< valueFilter
const activeFilters = {
  features: [],
  guests: ANY_FILTER_VALUE,
  rooms: ANY_FILTER_VALUE,
  price: [],
  type: ANY_FILTER_VALUE,
};

const renderAdsOfferPins = (item) => {
  const pins = item.map((ad) => L.marker(ad.location, {icon: iconOfferPin, pane: ADS_PIN_PANE})
    .bindPopup(getOffers(ad)));
  pins.forEach((pin) => pin.addTo(map));
};

export const initAds = (newAds) => {
  ads = newAds;
  renderAdsOfferPins(ads.slice(0, 10));
};

export const hidePopup = () => {
  map.closePopup();
};

const rerenderPinsAds = debounce(() => {
  hidePopup();
  const oldPins = map.getPane(ADS_PIN_PANE).querySelectorAll('.leaflet-marker-icon');
  oldPins.forEach((item) => item.remove());
  renderAdsOfferPins(ads.filter((ad) => Object.entries(activeFilters).every(([ key, value ]) => {
    if (key === 'price') {
      if (value.length === 0) {
        return true;
      }
      return ad.offer.price >= value[0] && ad.offer.price <= value[1];
    }
    if (key === 'features') {
      if (value.length === 0) {
        return true;
      }
      if (ad.offer.features === undefined) {
        return false;
      }
      return value.every((feature) => ad.offer.features.includes(feature));
    }
    if (key === 'rooms' || key === 'guests') {
      if (value === ANY_FILTER_VALUE) {
        return true;
      }
      return ad.offer[key] === Number(value);
    }
    if (value === ANY_FILTER_VALUE) {
      return true;
    }
    return ad.offer[key] === value;
  }
  )).slice(0, 10));
}, DEBOUNCE_TIMEOUT);

export const filterAds = (key, value) => {
  activeFilters[key] = value;
  rerenderPinsAds();
};

export const setDefaultCenter = () => {
  map.setView(defaultView.center, defaultView.zoom);
  marker.setLatLng(defaultView.center);
};

export const initMap = () => {
  setDefaultCenter();
  tiles.addTo(map);
  marker.addTo(map);
  map.createPane(ADS_PIN_PANE);
};
