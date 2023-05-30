import { activateForm } from './form.js';
import { getOffers } from './template.js';

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
  iconSize: [ 38, 95 ],
  iconAnchor: [ 24, 48 ],
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

export const renderAdsOfferPins = (ads) => {
  const pins = ads.map((ad) => L.marker(ad.location, {icon: iconOfferPin})
    .bindPopup(getOffers(ad)));
  pins.forEach((pin) => pin.addTo(map));
};

export const initMap = () => {
  map.setView(defaultView.center, defaultView.zoom);
  tiles.addTo(map);
  marker.addTo(map);
};