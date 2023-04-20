import { getRandomInteger, getRandomFloat, getRandomArrayElement } from './util.js';
import {ARRAY_COUNT,MIN_PRICE,MAX_PRICE,MAX_ROOMS,MAX_GUESTS,TITLES,TYPES,TIMES,FEATURES,DESCRIPTIONS,PHOTOS,LOCATIONS} from './data.js';

const getRandomLat = () => {
  getRandomFloat(LOCATIONS.MIN_LAT, LOCATIONS.MAX_LAT, 5);
};

const getRandomLng = () => {
  getRandomFloat(LOCATIONS.MAX_LNG, LOCATIONS.MAX_LNG, 5);
};

const createAuthor = (elem) => ({
  avatar: `img/avatars/user${String(elem).padStart(2, '0')}.png`
});

const createDataGeneration = () => ({
  author: {
    avatar: createAuthor(),
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${getRandomLat()}, ${getRandomLng()}`,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger(1, MAX_ROOMS),
    guests: getRandomInteger(1, MAX_GUESTS),
    checkin: getRandomArrayElement(TIMES),
    checkout: getRandomArrayElement(TIMES),
    features: getRandomArrayElement(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArrayElement(PHOTOS)
  },
  location: {
    lat: getRandomLat(),
    lng: getRandomLng(),
  }
});

const getOffers = () =>
  Array.from({ length: ARRAY_COUNT }, (_, pictureIndex) =>
    createDataGeneration(pictureIndex + 1)
  );

console.log(getOffers());
export { getOffers };
