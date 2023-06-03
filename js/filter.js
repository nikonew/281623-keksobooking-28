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

houseTypeFilter.addEventListener('change', (event) => {
  filterAds('type', event.target.value);
});

housePriceFilter.addEventListener('change', (event) => {
  filterAds('price', priceValueToFilterValueFilter[event.target.value]);
});

roomsFilter.addEventListener('change', (event) => {
  filterAds('rooms', event.target.value);
});

guestsFilter.addEventListener('change', (event) => {
  filterAds('guests', event.target.value);
});

featureFilter.addEventListener('change', (event) => {
  const newValue = event.target.value;
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
