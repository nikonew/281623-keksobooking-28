const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

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

export { getRandomInteger, getRandomFloat, getRandomArrayElement, getCountGuestsError };
