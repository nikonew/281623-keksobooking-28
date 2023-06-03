import { FILE_TYPES } from './data.js';

const photoChooser = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewPhoto.innerHTML = '';
    const addNewElement = document.createElement('img');
    addNewElement.classList.add('ad-form__image');
    addNewElement.src = URL.createObjectURL(file);
    previewPhoto.append(addNewElement);
  }
});

export const resetPhoto = () => {
  previewPhoto.innerHTML = '';
};
