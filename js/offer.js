import {
  ARRAY_COUNT,
  AVATAR_COUNT,
  DESCRIPTIONS,
  FEATURES,
  LOCATIONS,
  MAX_GUESTS,
  MAX_PRICE,
  MAX_ROOMS,
  MIN_PRICE,
  PHOTOS,
  TIMES,
  TITLES,
  TYPES
} from './data.js';
import { getRandomArrayElement, getRandomFloat, getRandomInteger, shuffleTheArr } from './util.js';

const createAuthor = () => ({
  avatar: `img/avatars/user${ getRandomInteger(1, AVATAR_COUNT).toString().padStart(2, '0') }.png`
});

const createDataGeneration = () => ({
  author: {avatar: createAuthor()},
  offer: {
    title: getRandomArrayElement(TITLES),
    adress: `${ getRandomFloat(LOCATIONS.MIN_LAT, LOCATIONS.MAX_LAT, 5) }, ${ getRandomFloat(
      LOCATIONS.MIN_LNG,
      LOCATIONS.MAX_LNG,
      5
    ) }`,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger(1, MAX_ROOMS),
    guests: getRandomInteger(1, MAX_GUESTS),
    checkin: getRandomArrayElement(TIMES),
    checkout: getRandomArrayElement(TIMES),
    features: shuffleTheArr(FEATURES).slice(0, (getRandomInteger(1, FEATURES.length))),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: shuffleTheArr(PHOTOS).slice(0, (getRandomInteger(1, FEATURES.length))),
  },
  location: {
    lat: getRandomFloat(LOCATIONS.MIN_LAT, LOCATIONS.MAX_LAT, 5),
    lng: getRandomFloat(LOCATIONS.MIN_LNG, LOCATIONS.MAX_LNG, 5),
  }
});

const getOffers = () =>
  Array.from({length: ARRAY_COUNT}, (_, pictureIndex) =>
    createDataGeneration(pictureIndex + 1)
  );

const offerContent = getOffers();

export { offerContent };
