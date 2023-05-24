import { VALIDATE_REQUIREMENTS } from './data.js';

export const validateTitleFirstLetter = (value) => value.length !== 0 && value[0] === value[0].toUpperCase();

export const validateTitleMinLength = (value) => value.length !== 0 && value.length > VALIDATE_REQUIREMENTS.TITLE.MIN;

export const validateTitleMaxLength = (value) => value.length !== 0 && value.length < VALIDATE_REQUIREMENTS.TITLE.MAX;

export const validateMinPrice = (value, houseType) => value >= VALIDATE_REQUIREMENTS.PRICE.MIN(houseType);

export const validateMaxPrice = (value) => value <= VALIDATE_REQUIREMENTS.PRICE.MAX;

export const validateCountGuests = (value, countRooms) => VALIDATE_REQUIREMENTS.GUESTS.COUNT(countRooms)
  .includes(value);

export const validateTimeOut = (value, timeIn) => value === timeIn;
