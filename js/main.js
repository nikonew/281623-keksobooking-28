import { switchOffForm, switchOnForm } from './form.js';
import { offerContent } from './offer.js';
import { renderOffers } from './template.js';

renderOffers(offerContent.slice(0, 1));

switchOffForm();
switchOnForm();
