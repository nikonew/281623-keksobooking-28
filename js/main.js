const AVATAR_COUNT = 10;
const PRICE = 0;
const ROOMS = 10;
const GUESTS = 5;

const TITLES = ['бунгало в центре Токио', 'бараки на окраине Токио', 'общага в крутом районе Токио'];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel',];

const TIMES = ['12:30', '13:00', '14:00',];

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

const POHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


const LOCATIONS = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LONG: 139.7,
  MAX_LONG: 139.8,
};


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const createDataGeneration = () => ({
  title: getRandomArrayElement(TITLES),
  description: getRandomArrayElement(DESCRIPTIONS),
  type: getRandomArrayElement(TYPES),
});
