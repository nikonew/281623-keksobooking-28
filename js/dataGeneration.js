import { getRandomInteger, getRandomFloat, getRandomArrayElement } from './util.js';
import {ARRAY_COUNT,MIN_PRICE,MAX_PRICE,MAX_ROOMS,MAX_GUESTS,TITLES,TYPES,TIMES,FEATURES,DESCRIPTIONS,PHOTOS,LOCATIONS, AVATAR_COUNT} from './data.js';


const createAuthor = () => ({
  avatar: `img/avatars/user${getRandomInteger(1, AVATAR_COUNT).toString().padStart(2, '0')}.png`
});

const createDataGeneration = () => ({
  author: {
    avatar: createAuthor(),
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${LOCATIONS.MAX_LAT}, ${LOCATIONS.MAX_LNG}`,
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
    lat: getRandomFloat(LOCATIONS.MIN_LAT, LOCATIONS.MAX_LAT, 5),
    lng: getRandomFloat(LOCATIONS.MIN_LNG, LOCATIONS.MAX_LNG, 5),
  }
});

const getOffers = () =>
  Array.from({ length: ARRAY_COUNT }, (_, pictureIndex) =>
    createDataGeneration(pictureIndex + 1)
  );


export { getOffers };
