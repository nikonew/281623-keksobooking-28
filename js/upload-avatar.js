import { FILE_TYPES } from './data.js';

const avatarChooser = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

export const resetAvatar = () => {
  previewAvatar.src = 'img/muffin-grey.svg';
};
