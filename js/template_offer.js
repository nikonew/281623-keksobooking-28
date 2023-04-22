import { offerContent } from './dataGeneration.js';

const mapCanvas = document.querySelector('#map-canvas');
const offerTemplate = document.querySelector('#card').content;
const offerContainer = offerTemplate.querySelector('.popup');
const offerFragment = document.createDocumentFragment();

offerContent.forEach((data) => {
  const userOffer = offerTemplate.cloneNode(true);
  userOffer.querySelector('.popup__title').textContent = data.offer.title;
  userOffer.querySelector('.popup__text--address').textContent = data.offer.address;
  userOffer.querySelector('.popup__type').textContent = data.offer.type;
  offerContainer.append(userOffer);
});
offerContainer.append(offerFragment);

const renderMapCanvas = () => {
  mapCanvas.append(offerFragment);
};

renderMapCanvas(offerContent);
