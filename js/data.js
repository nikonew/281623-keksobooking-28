import { getCountGuestsError } from './util.js';

const ALERT_SHOW_TIME = 5000;

const ADS_PIN_PANE = 'ads-pins';

const ANY_FILTER_VALUE = 'any';

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

const DEBOUNCE_TIMEOUT = 500;

export {
  ALERT_SHOW_TIME,
  ADS_PIN_PANE,
  ANY_FILTER_VALUE,
  VALIDATE_REQUIREMENTS,
  VALIDATE_MESSAGE,
  mapHousingTypeToMinPrice,
  DEBOUNCE_TIMEOUT
};
