import { mapHousingTypeToMinPrice, VALIDATE_MESSAGE } from './data.js';
import {
  validateCountGuests,
  validateMaxPrice,
  validateMinPrice,
  validateTimeOut,
  validateTitleFirstLetter,
  validateTitleMaxLength,
  validateTitleMinLength
} from './validate.js';

const form = document.querySelector('.ad-form');
const fieldTitle = form.querySelector('#title');
const selectHousingType = form.querySelector('#type');
const fieldPrice = form.querySelector('#price');
const priceSlider = document.querySelector('#price-slider');
const countRooms = form.querySelector('#room_number');
const countGuests = form.querySelector('#capacity');
const selectTimeIn = form.querySelector('#timein');
const selectTimeOut = form.querySelector('#timeout');
const formFieldset = form.querySelectorAll('fieldset');
const formSlider = form.querySelector('.ad-form__slider');
const mapFilters = document.querySelector('.map__filters');
const mapFieldsetFiltres = mapFilters.querySelectorAll('fieldset');

const priceSliderOption = {
  start: 1000,
  connect: true,
  range: {
    'min': 0,
    'max': 10000
  },
  step: 1,
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
});
const handlerHousingType = (event) => {
  const toMinPrice = mapHousingTypeToMinPrice[event.target.value];
  fieldPrice.placeholder = toMinPrice;
  pristine.validate(fieldPrice);
};

const handlerCountRoomsChange = () => {
  pristine.validate(countGuests);
};

const handlerTimeInChange = () => {
  pristine.validate(selectTimeOut);
};

const handlePriceSliderUpdate = (values, handle) => {
  fieldPrice.value = values[handle].split('.')[0];
  pristine.validate(fieldPrice);
};

noUiSlider.create(priceSlider, priceSliderOption);
priceSlider.noUiSlider.on('update', handlePriceSliderUpdate);

Pristine.setLocale('ru');
Pristine.addMessages('ru', {
  required: VALIDATE_MESSAGE.COMMON.REQUIRED,
});

pristine.addValidator(
  fieldTitle,
  validateTitleFirstLetter, VALIDATE_MESSAGE.TITLES.FIRST_LETTER, 1, true
);

pristine.addValidator(
  fieldTitle,
  validateTitleMinLength, VALIDATE_MESSAGE.TITLES.MIN
);

pristine.addValidator(
  fieldTitle,
  validateTitleMaxLength, VALIDATE_MESSAGE.TITLES.MAX
);

pristine.addValidator(
  fieldPrice,
  (value) => validateMinPrice(value, selectHousingType.value),
  () => VALIDATE_MESSAGE.PRICE.MIN(mapHousingTypeToMinPrice[selectHousingType.value]),
);

pristine.addValidator(
  fieldPrice,
  validateMaxPrice,
  VALIDATE_MESSAGE.PRICE.MAX
);

pristine.addValidator(
  countGuests,
  (value) => validateCountGuests(Number(value), Number(countRooms.value)),
  () => VALIDATE_MESSAGE.GUESTS.COUNT(Number(countRooms.value))
);

pristine.addValidator(
  selectTimeOut,
  (value) => validateTimeOut(value, selectTimeIn.value),
  VALIDATE_MESSAGE.TIME_OUT.VALUE
);

selectHousingType.addEventListener('change', handlerHousingType);
countRooms.addEventListener('change', handlerCountRoomsChange);
selectTimeIn.addEventListener('change', handlerTimeInChange);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isFormValid = pristine.validate();
  if (isFormValid) {
    form.submit();
  }
});

const activateFiltres = (activate) => {
  if (activate) {
    mapFilters.classList.remove('map__filters--disabled');
    mapFieldsetFiltres.forEach((fieldset) => {
      fieldset.removeAttribute('disabled');
    });
  } else {
    mapFilters.classList.add('map__filters--disabled');
    mapFieldsetFiltres.forEach((fieldset) => {
      fieldset.setAttribute('disabled', 'true');
    });
  }
};

const activateForm = (activate) => {
  if (activate) {
    form.classList.remove('ad-form--disabled');
    formSlider.classList.remove('ad-form__slider--disabled');
    formFieldset.forEach((fieldset) => {
      fieldset.removeAttribute('disabled');
    });
  } else {
    form.classList.add('ad-form--disabled');
    formSlider.classList.add('ad-form__slider--disabled');
    formFieldset.forEach((fieldset) => {
      fieldset.setAttribute('disabled', 'true');
    });
  }
};

export { activateFiltres, activateForm };
