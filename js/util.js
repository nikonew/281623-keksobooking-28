import { ALERT_SHOW_TIME } from './data.js';

const alertContainer = document.querySelector('#alertContainer');

const isEscapeKey = (evt) => evt.key === 'Escape';

const getCountGuestsError = (countGuestsArr) => {
  if (countGuestsArr.length === 1 && countGuestsArr[0] === 1) {
    return `Количество гостей должно быть ${ countGuestsArr[0] } человек`;
  }
  if (countGuestsArr.length === 1 && countGuestsArr[0] === 0) {
    return 'Не подразумевает гостей';
  }
  return countGuestsArr.reduce((previousValue, currentValue, currentIndex) => {
    const newValue = currentIndex !== countGuestsArr.length - 1 ?
      `${ currentValue }, ` :
      `или ${ currentValue } человека`;
    return `${ previousValue }${ newValue }`;
  }, 'Количество гостей должно быть');
};

const showAlert = (message) => {
  alertContainer.classList.remove('hidden');
  alertContainer.textContent = message;
  setTimeout(() => {
    alertContainer.classList.add('hidden');
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getCountGuestsError, showAlert, isEscapeKey, debounce };
