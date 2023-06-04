import { TYPES } from './data.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

export const getOffers = ({author, offer}) => {
  const userOffer = offerTemplate.cloneNode(true);
  userOffer.querySelector('.popup__title').textContent = offer.title;
  userOffer.querySelector('.popup__text--address').textContent = offer.adress;
  userOffer.querySelector('.popup__text--price').textContent = `${ offer.price }₽/ночь`;
  userOffer.querySelector('.popup__type').textContent = TYPES[offer.type];
  userOffer.querySelector('.popup__text--capacity').textContent = `${ offer.rooms } комнаты для ${ offer.guests } гостей`;
  userOffer.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до${ offer.checkout }`;
  const offerDescription = userOffer.querySelector('.popup__description');
  if (offer.description === '') {
    offerDescription.classList.add('hidden');
  } else {
    offerDescription.textContent = offer.description;
  }
  if (offer.features !== undefined && offer.features.length !== 0) {
    userOffer.querySelector('.popup__features').innerHTML =
      offer.features.map((feature) => `<li class="popup__feature popup__feature--${ feature }"></li>`).join('');
  } else {
    userOffer.querySelector('.popup__features').remove();
  }
  if (offer.photos !== undefined && offer.photos.length !== 0) {
    userOffer.querySelector('.popup__photos').innerHTML =
      offer.photos.map((photo) => `<img src="${ photo }" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
        .join('');
  } else {
    userOffer.querySelector('.popup__photos').remove();
  }
  userOffer.querySelector('.popup__avatar').src = author.avatar.length === 0 ?
    'img/avatars/default.png' :
    author.avatar;
  return userOffer;
};


