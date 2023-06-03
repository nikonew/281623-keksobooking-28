import { getCountGuestsError } from './util.js';

const ALERT_SHOW_TIME = 5000;

const ADS_PIN_PANE = 'ads-pins';

const ANY_FILTER_VALUE = 'any';

const MAP_HOUSE_TYPE_TO_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const MAP_COUNT_ROOMS_TO_COUNT_GUESTS = {
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
    MIN: (houseType) => MAP_HOUSE_TYPE_TO_MIN_PRICE[houseType],
    MAX: 100000
  },
  GUESTS: {
    COUNT: (countRooms) => MAP_COUNT_ROOMS_TO_COUNT_GUESTS[countRooms]
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
    COUNT: (countRooms) => getCountGuestsError(MAP_COUNT_ROOMS_TO_COUNT_GUESTS[countRooms]),
  },
  TIME_OUT: {
    VALUE: 'Время выезда должно совпадать со временем заезда'
  },
  COMMON: {
    REQUIRED: 'Обязательное поле'
  }
};

const PRICE_SLIDER_OPTION = {
  start: 1000,
  connect: true,
  range: {
    min: 0,
    max: 100000
  },
  step: 1,
};
const DEBOUNCE_TIMEOUT = 500;

const FILE_TYPES = [ 'jpg', 'png', 'jpeg' ];

export {
  ALERT_SHOW_TIME,
  ADS_PIN_PANE,
  ANY_FILTER_VALUE,
  VALIDATE_REQUIREMENTS,
  VALIDATE_MESSAGE,
  MAP_HOUSE_TYPE_TO_MIN_PRICE,
  PRICE_SLIDER_OPTION,
  DEBOUNCE_TIMEOUT,
  FILE_TYPES
};
