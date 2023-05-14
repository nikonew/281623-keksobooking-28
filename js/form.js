const form = document.querySelector('.ad-form');
const formFieldset = form.querySelectorAll('fieldset');
const formSlider = form.querySelector('.ad-form__slider');
const mapFilters = document.querySelector('.map__filters');
const mapFieldset = mapFilters.querySelectorAll('fieldset');

const switchOffForm = () => {
  form.classList.add('ad-form--disabled');
  formSlider.classList.add('ad-form__slider--disabled');
  mapFilters.classList.add('map__filters--disabled');
  formFieldset.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });
  mapFieldset.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });
};

const switchOnForm = () => {
  form.classList.remove('ad-form--disabled');
  formSlider.classList.remove('ad-form__slider--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  formFieldset.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
  mapFieldset.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

export {switchOffForm, switchOnForm};
