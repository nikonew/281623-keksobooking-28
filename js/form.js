import { sendData } from './api.js';
import { MAP_HOUSE_TYPE_TO_MIN_PRICE, PRICE_SLIDER_OPTION, VALIDATE_MESSAGE } from './data.js';
import { resetFilters } from './filter.js';
import { hidePopup, setDefaultCenter } from './map.js';
import { resetAvatar } from './upload-avatar.js';
import { resetPhoto } from './upload-photo.js';
import { isEscapeKey } from './util.js';
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
const resetButton = form.querySelector('.ad-form__reset');
const errorContainer = document.querySelector('.error');
const successContainer = document.querySelector('.success');
const errorButton = errorContainer.querySelector('.error__button');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
});
const handlerHousingType = (evt) => {
  const toMinPrice = MAP_HOUSE_TYPE_TO_MIN_PRICE[evt.target.value];
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

noUiSlider.create(priceSlider, PRICE_SLIDER_OPTION);
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
  () => VALIDATE_MESSAGE.PRICE.MIN(MAP_HOUSE_TYPE_TO_MIN_PRICE[selectHousingType.value]),
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

const resetForm = () => {
  form.reset();
  resetFilters();
  hidePopup();
  setDefaultCenter();
  resetAvatar();
  resetPhoto();
};

const handleSuccessMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    successContainer.classList.add('hidden');
    document.removeEventListener('keydown', handleSuccessMessageKeydown);
  }
};

const handleSuccessMessageClick = () => {
  successContainer.classList.add('hidden');
  successContainer.removeEventListener('click', handleSuccessMessageClick);
};

const showSuccessMessage = () => {
  successContainer.classList.remove('hidden');
  document.addEventListener('keydown', handleSuccessMessageKeydown);
  successContainer.addEventListener('click', handleSuccessMessageClick);
};

const handleErrorMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    errorContainer.classList.add('hidden');
    document.removeEventListener('keydown', handleErrorMessageKeydown);
  }
};

const handleErrorMessageClick = () => {
  errorContainer.classList.add('hidden');
  errorButton.removeEventListener('click', handleErrorMessageClick);
};

const showErrorMessage = () => {
  errorContainer.classList.remove('hidden');
  document.addEventListener('keydown', handleErrorMessageKeydown);
  errorContainer.addEventListener('click', handleErrorMessageClick);
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  if (isFormValid) {
    sendData(new FormData(form)).then(() => {
      showSuccessMessage();
      resetForm();
    }).catch(() => {
      showErrorMessage();
    });
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
