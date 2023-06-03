import { VALIDATE_REQUIREMENTS } from './data.js';
import { filterAds } from './map.js';

const mapFilter = document.querySelector('#map-filters');
const houseTypeFilter = mapFilter.querySelector('#housing-type');
const housePriceFilter = mapFilter.querySelector('#housing-price');
const guestsFilter = mapFilter.querySelector('#housing-guests');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const featureFilter = mapFilter.querySelector('#housing-features');

const priceValueToFilterValueFilter = {
  any: [],
  middle: [ 10000, 50000 ],
  low: [ 0, 10000 ],
  high: [ 50000, VALIDATE_REQUIREMENTS.PRICE.MAX ],
};

let activeFeaturesValue = [];

houseTypeFilter.addEventListener('change', (evt) => {
  filterAds('type', evt.target.value);
});

housePriceFilter.addEventListener('change', (evt) => {
  filterAds('price', priceValueToFilterValueFilter[evt.target.value]);
});

roomsFilter.addEventListener('change', (evt) => {
  filterAds('rooms', evt.target.value);
});

guestsFilter.addEventListener('change', (evt) => {
  filterAds('guests', evt.target.value);
});

featureFilter.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (activeFeaturesValue.includes(newValue)) {
    activeFeaturesValue = activeFeaturesValue.filter((item) => item !== newValue);
  } else {
    activeFeaturesValue = [ ...activeFeaturesValue, newValue ];
  }
  filterAds('features', activeFeaturesValue);
});

export const resetFilters = () => {
  mapFilter.reset();
};
