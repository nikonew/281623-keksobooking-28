import { getCountGuestsError } from './util.js';

const AVATAR_COUNT = 10;
const ARRAY_COUNT = 10;
const MIN_PRICE = 10;
const MAX_PRICE = 5000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 5;

const TITLES = [ 'бунгало в центре Токио', 'бараки на окраине Токио', 'общага в крутом районе Токио' ];

const TYPES = [ 'palace', 'flat', 'house', 'bungalow', 'hotel', ];

const TIMES = [ '12:30', '13:00', '14:00', ];

const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

const DESCRIPTIONS = [
  'Свистать всех на верх',
  'Тише едешь - дальше будешь.',
  'Чем дальше в лес, тем больше дров',
  'Бросить тень на плетень',
  'Рад бы в рай да грехи не пускают',
  'Запретный плод сладок',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


const LOCATIONS = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LNG: 139.7,
  MAX_LNG: 139.8,
};

const mapHousingTypeToMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const mapCountRoomsToCountGuests = {
  1: [ 1 ],
  2: [ 1, 2 ],
  3: [ 1, 2, 3 ],
  100: [ 0 ]
};

const VALIDATE_REQUIREMENTS = {
  TITLE: {
    MIN: 30,
    MAX: 100,
  },
  PRICE: {
    MIN: (houseType) => mapHousingTypeToMinPrice[houseType],
    MAX: 100000
  },
  GUESTS: {
    COUNT: (countRooms) => mapCountRoomsToCountGuests[countRooms]
  },
  TIME_OUT: {}
};

const VALIDATE_MESSAGE = {
  TITLES: {
    MIN: 'Минимальная длина 30 символов',
    MAX: 'Максимальная длина 100 символов',
    FIRST_LETTER: 'Заголовок должен начинаться с заглавной буквы'
  },
  PRICE: {
    MIN: (limit) => `Цена должна быть не менее ${ limit }`,
    MAX: `Цена должна быть не более ${ VALIDATE_REQUIREMENTS.PRICE.MAX }`
  },
  GUESTS: {
    COUNT: (countRooms) => getCountGuestsError(mapCountRoomsToCountGuests[countRooms]),
  },
  TIME_OUT: {
    VALUE: 'Время выезда должно совпадать со временем заезда'
  },
  COMMON: {
    REQUIRED: 'Обязательное поле'
  }
};


export {
  AVATAR_COUNT,
  ARRAY_COUNT,
  MIN_PRICE,
  MAX_PRICE,
  MAX_ROOMS,
  MAX_GUESTS,
  TITLES,
  TYPES,
  TIMES,
  FEATURES,
  DESCRIPTIONS,
  PHOTOS,
  LOCATIONS,
  VALIDATE_REQUIREMENTS,
  VALIDATE_MESSAGE,
  mapHousingTypeToMinPrice
};
